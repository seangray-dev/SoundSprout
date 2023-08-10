import { updatePackData, updateSoundData } from '@/redux/features/upload-pack';
import { RootState } from '@/redux/store';
import Cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
	const dispatch = useDispatch();

	const packData = useSelector(
		(state: RootState) => state.uploadReducer.packData
	);
	const soundData = useSelector(
		(state: RootState) => state.uploadReducer.soundData
	);

	const [showDialog, setShowDialog] = useState(false);

	const handlePackDataChange = (key: string, value: any) => {
		const updatedPackData = { ...packData, [key]: value };
		dispatch(updatePackData(updatedPackData));
		Cookie.set('packData', JSON.stringify(updatedPackData));
	};

	const handleSoundDataChange = (updatedSounds: any) => {
		dispatch(updateSoundData(updatedSounds));
		Cookie.set('soundData', JSON.stringify(updatedSounds));
	};

	useEffect(() => {
		const savedPackData = Cookie.get('packData');
		const savedSoundData = Cookie.get('soundData');

		if (savedPackData) {
			dispatch(updatePackData(JSON.parse(savedPackData)));
		}

		if (savedSoundData) {
			dispatch(updateSoundData(JSON.parse(savedSoundData)));
		}
	}, [dispatch]);

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
					<PackTab />
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
