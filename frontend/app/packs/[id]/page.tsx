'use client';

import { getPackById } from '@/app/api/api';
import { getCoverArtUrl, getPreviewUrl } from '@/app/api/cloudinary';
import Btn_Primary_Small from '@/app/components/Buttons/Btn_Purple_Small';
import AudioPlayer from '@/app/components/Layout/AudioPlayer';
import PackSounds from '@/app/components/Layout/PackSounds';
import { Pack } from '@/app/types';
import { PlayIcon, PlusSmallIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Packs({ params }: { params: { id: number } }) {
	const [pack, setPack] = useState<Pack | null>(null);

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

	return (
		<>
			<main className='container mt-10'>
				{pack && (
					<>
						<section className='flex flex-col md:grid grid-cols-2'>
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
										<h2 className='text-xl'>{pack.uploader.first_name}</h2>
										<h1 className='font-bold text-3xl'>{pack.name}</h1>
										<p>${pack.price}</p>
									</div>
									<div className='flex gap-2 mt-4 justify-center md:justify-normal'>
										<Btn_Primary_Small>
											<PlusSmallIcon className='w-6 h-6'></PlusSmallIcon>
											Get Pack
										</Btn_Primary_Small>
										<button className='flex items-center gap-2 py-1 px-4 border border-black rounded-full hover:opacity-30 transition-all duration-300'>
											<PlayIcon className='w-6 h-6' />
											<span>Preview</span>
											<audio
												src={pack.preview ? getPreviewUrl(pack.preview) : ''}
												// controls
											/>
										</button>
									</div>
								</div>
								<p className='text-center md:text-left'>{pack.description}</p>
							</article>
						</section>
						<PackSounds
							packId={params.id.toString()}
							coverArtLocation={pack.cover_art_location}
						/>
					</>
				)}
			</main>
			<AudioPlayer />
		</>
	);
}
