'use client';

import { getPacksByGenre, getSoundsByGenre } from '@/app/api/api';
import { getCoverArtUrl } from '@/app/api/cloudinary';
import AudioPlayer from '@/app/components/Layout/AudioPlayer';
import Heading from '@/app/components/Utils/Heading';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const SOUND_URL = process.env.NEXT_PUBLIC_CLOUDINARY_SOUND_URL;

const GenrePage = ({ params }: { params: { id: number } }) => {
	const id = params.id;
	const [packs, setPacks] = useState([]);
	const [sounds, setSounds] = useState([]);

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

	function getCoverArtFromPack(packId) {
		// Retrieve the pack information based on the packId
		const pack = packs.find((pack) => pack.id === packId);

		// Return the cover art URL if the pack is found
		return pack ? getCoverArtUrl(pack.cover_art_location) : null;
	}

	return (
		<>
			<main className='container'>
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

				<h2>Sounds:</h2>
				<ul className='flex flex-col gap-2'>
					{sounds.map((sound) => (
						<li key={sound.id} className='flex items-center gap-2'>
							<Image
								src={getCoverArtFromPack(sound.pack)}
								width={36}
								height={36}
								alt=''
								aria-label='none'
							/>
							<p className='text-sm'>{sound.name}</p>
							{/* <audio controls src={`${SOUND_URL}/${sound.audio_file}`}></audio> */}
						</li>
					))}
				</ul>
			</main>
			<AudioPlayer />
		</>
	);
};

export default GenrePage;
