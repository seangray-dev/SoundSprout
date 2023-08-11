'use client';

import { getPackById } from '@/app/api/api';
import { getCoverArtUrl, getPreviewUrl } from '@/app/api/cloudinary';
import Btn_Primary_Small from '@/app/components/Buttons/Btn_Purple_Small';
import AudioPlayer from '@/app/components/Layout/AudioPlayer';
import PackSounds from '@/app/components/Layout/PackSounds/PackSounds';
import PackSoundsHeader from '@/app/components/Layout/PackSounds/PackSoundsHeader';
import { Button } from '@/app/components/ui/button';
import { useToast } from '@/app/components/ui/use-toast';
import { Pack } from '@/app/types';
import { handleAddPackToCart } from '@/redux/features/cartActions';
import {
	setCurrentSound,
	togglePlay,
} from '@/redux/features/currentSound-slice';
import { PlayIcon, PlusSmallIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Packs({ params }: { params: { id: number } }) {
	const [pack, setPack] = useState<Pack | null>(null);
	const dispatch = useDispatch();
	const { toast } = useToast();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getPackById(params.id);
				setPack(data);
			} catch (err) {
				console.error(err);
			}
		};

		fetchData();
	}, [params.id]);

	const handlePreviewClick = () => {
		if (pack) {
			const previewUrl = pack.preview ? getPreviewUrl(pack.preview) : '';
			dispatch(
				setCurrentSound({
					audio_file: `${previewUrl}`,
					coverArt: getCoverArtUrl(pack.cover_art_location),
					name: pack.name,
					price: pack.price,
					id: 0,
					bpm: 0,
					key: '',
					pack: pack,
					purchase_count: 0,
					created_at: '',
					modified_at: '',
					isPlaying: true,
					isPack: true,
				})
			);
			dispatch(togglePlay());
		}
	};

	return (
		<>
			<section className='container my-10'>
				{pack && (
					<>
						<header className='flex flex-col md:grid grid-cols-2 mb-4'>
							<div>
								<Image
									src={getCoverArtUrl(pack.cover_art_location)}
									width={300}
									height={300}
									alt={pack.name}
									className='mx-auto md:mx-0'
								/>
							</div>
							<article className='flex flex-col gap-6 mt-4 md:mt-0'>
								<div className='text-center md:text-left'>
									<div className='flex flex-col gap-2'>
										<h2 className='text-xl font-light'>
											{pack.uploader.first_name}
										</h2>
										<h1 className='font-bold text-3xl'>{pack.name}</h1>
										<p>${pack.price}</p>
									</div>
									<div className='flex gap-2 mt-4 justify-center md:justify-normal'>
										<Button
											onClick={(event) =>
												handleAddPackToCart(dispatch, toast, event, pack)
											}
											className='flex items-center gap-2 py-1 px-4 border bg-purple text-white border-purple hover:bg-purple hover:opacity-80 rounded-md transition-all duration-300'>
											<PlusSmallIcon className='w-6 h-6'></PlusSmallIcon>
											Get Pack
										</Button>
										<Button
											onClick={handlePreviewClick}
											className='flex items-center gap-2 py-1 px-4 border bg-white text-black border-black rounded-md hover:text-purple hover:bg-white hover:border-purple transition-all duration-300'>
											<PlayIcon className='w-6 h-6' />
											<span>Preview</span>
										</Button>
									</div>
								</div>
								<p className='font-light text-center md:text-left'>
									{pack.description}
								</p>
							</article>
						</header>
						<div className='mt-16'>
							<PackSoundsHeader />
							<PackSounds
								packId={params.id.toString()}
								coverArtLocation={pack.cover_art_location}
							/>
						</div>
					</>
				)}
			</section>
			<AudioPlayer />
		</>
	);
}
