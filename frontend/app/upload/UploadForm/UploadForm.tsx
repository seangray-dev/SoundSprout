import Cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from '../../components/ui/dialog';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '../../components/ui/tabs';
import PackTab from './PackTab';
import SoundsTab from './SoundsTab';

const UploadForm = () => {
	const [packData, setPackData] = useState({
		packName: '',
		packDescription: '',
		packGenre: '',
		packImage: null,
		packPreview: null,
		packPrice: '',
	});

	const [soundData, setSoundData] = useState<
		Array<{
			file: File;
			name: string;
			key: string;
			bpm: number;
			tags: string;
			price: number;
		}>
	>([]);

	const [showDialog, setShowDialog] = useState(false);

	const handlePackDataChange = (key: string, value: any) => {
		const updatedPackData = { ...packData, [key]: value };
		setPackData(updatedPackData);

		console.log('Updating Pack Data:', updatedPackData);

		Cookie.set('packData', JSON.stringify(updatedPackData));
	};

	const handleSoundDataChange = (updatedSounds: any) => {
		setSoundData(updatedSounds);

		console.log('Updating Sound Data:', updatedSounds);

		Cookie.set('soundData', JSON.stringify(updatedSounds));
	};

	const handleSubmit = async () => {
		console.log('Form submitted with data:', packData);

		try {
			const responsePack = await fetch('/api/pack', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: packData.packName,
					description: packData.packDescription,
					price: packData.packPrice,
					cover_art_location: packData.packImage,
					preview: packData.packPreview,
				}),
			});

			if (!responsePack.ok) throw new Error('Error storing pack information.');

			const packResult = await responsePack.json();
			const packId = packResult.id;

			for (let sound of soundData) {
				const responseSound = await fetch('/api/sound', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name: sound.name,
						audio_file: sound.file,
						bpm: sound.bpm,
						key: sound.key,
						price: sound.price,
						pack: packId,
					}),
				});

				if (!responseSound.ok)
					throw new Error('Error storing sound information.');

				const soundResult = await responseSound.json();
				const soundId = soundResult.id;

				for (let tag of sound.tags) {
					await fetch('/api/soundtagassociation', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							sound: soundId,
							tag: tag,
						}),
					});
				}
			}

			await fetch('/api/packgenreassociation', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					pack: packId,
					genre: packData.packGenre,
				}),
			});

			Cookie.remove('packData');
			Cookie.remove('soundData');

			window.location.href = '/success';
		} catch (error) {
			console.error('Unexpected error:', error);
		}
	};

	useEffect(() => {
		const savedPackData = Cookie.get('packData');
		const savedSoundData = Cookie.get('soundData');

		console.log('Saved Pack Data from Cookies:', savedPackData);
		console.log('Saved Sound Data from Cookies:', savedSoundData);

		if (savedPackData) {
			setPackData(JSON.parse(savedPackData));
		}

		if (savedSoundData) {
			setSoundData(JSON.parse(savedSoundData));
		}
	}, []);

	return (
		<div className='p-4 mb-10'>
			<Tabs
				defaultValue='pack'
				className='flex flex-col justify-center items-center'>
				<TabsList>
					<TabsTrigger value='pack' style={{ fontSize: '1em', width: '104px' }}>
						Pack
					</TabsTrigger>
					<TabsTrigger
						value='sounds'
						style={{ fontSize: '1em', width: '104px' }}>
						Sounds
					</TabsTrigger>
				</TabsList>
				<TabsContent value='pack'>
					<PackTab
						packData={packData}
						handlePackDataChange={handlePackDataChange}
					/>
				</TabsContent>
				<TabsContent value='sounds'>
					<SoundsTab onSoundsUpdate={handleSoundDataChange} />
				</TabsContent>
			</Tabs>
			<div className='mt-4'>
				<Dialog open={showDialog}>
					<DialogTrigger
						role='button'
						tabIndex={0}
						onClick={() => setShowDialog(true)}
						className='bg-purple w-full font-bold text-white rounded-md cursor-pointer text-center p-2'
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								setShowDialog(true);
							}
						}}>
						Submit
					</DialogTrigger>

					<DialogContent>
						<DialogTitle>Confirm Submission</DialogTitle>
						<DialogDescription>
							Are you sure you want to submit?
						</DialogDescription>
						<button
							onClick={() => {
								handleSubmit();
								setShowDialog(false);
							}}>
							Yes, Submit
						</button>
						<button onClick={() => setShowDialog(false)}>No, Cancel</button>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
};

export default UploadForm;
