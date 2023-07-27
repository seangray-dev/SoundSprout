'use client';

import { getPacksByGenre, getSoundsByGenre } from '@/app/api/api';
import { getCoverArtUrl } from '@/app/api/cloudinary';
import AudioPlayer from '@/app/components/Layout/AudioPlayer';
import PackSounds from '@/app/components/Layout/PackSounds/PackSounds';
import PackSoundsHeader from '@/app/components/Layout/PackSounds/PackSoundsHeader';
import Heading from '@/app/components/Utils/Heading';
import { Pack, Sound } from '@/app/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const SOUND_URL = process.env.NEXT_PUBLIC_CLOUDINARY_SOUND_URL;

const GenrePage = ({ params }: { params: { id: number } }) => {
	const id = params.id;
	const [packs, setPacks] = useState<Pack[]>([]);
	const [sounds, setSounds] = useState<Sound[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const packsData = await getPacksByGenre(id);
				setPacks(packsData);

				const soundsData = await getSoundsByGenre(id);
				setSounds(soundsData);
			} catch (error) {
				console.log(error);
			}
		};

		if (id) {
			fetchData();
		}
	}, [id]);

	function getCoverArtFromPack(pack: Pack) {
		return getCoverArtUrl(pack.cover_art_location);
	}

	return (
		<section className='container my-10'>
			<header className='my-4'>
				<h1>Genre:</h1>
				<Heading level={2} className='text-xl'>
					Packs
				</Heading>
				<ul className='flex flex-wrap gap-4 '>
					{packs.map((pack) => (
						<Link href={`/packs/${pack.id}`}>
							<li className='mx-auto md:mx-0 flex flex-col gap-2' key={pack.id}>
								<div className='overflow-hidden'>
									<Image
										className='hover:scale-105 transition-all duration-500'
										width={200}
										height={200}
										alt={`${pack.name}`}
										src={getCoverArtUrl(pack.cover_art_location)}
									/>
								</div>
								<p className='text-xs'>{pack.name}</p>
							</li>
						</Link>
					))}
				</ul>
			</header>
			<div>
				<PackSoundsHeader />
				{packs.map((pack) => (
					<PackSounds
						key={pack.id}
						packId={pack.id.toString()}
						coverArtLocation={pack.cover_art_location}
					/>
				))}
			</div>
			<AudioPlayer />
		</section>
	);
};

export default GenrePage;
