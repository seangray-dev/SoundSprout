import { getCoverArtUrl } from '@/app/api/cloudinary';
import { Pack, PackSoundsProps, Sound } from '@/app/types';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const PackSounds = ({ packId, coverArtLocation }: PackSoundsProps) => {
	const [sounds, setSounds] = useState<Sound[]>([]);
	const [durations, setDurations] = useState<Record<number, number>>({});
	const audioRefs = useRef<HTMLAudioElement[]>([]);

	function getPreviewUrl(audio_file: string) {
		return `${process.env.NEXT_PUBLIC_CLOUDINARY_SOUND_URL}${audio_file}`;
	}

	useEffect(() => {
		const fetchSounds = async () => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/packs/${packId}/sounds`
			);
			const data = await response.json();
			setSounds(data);
		};

		fetchSounds();
	}, [packId]);

	useEffect(() => {
		audioRefs.current = audioRefs.current.slice(0, sounds.length);
	}, [sounds]);

	const handleLoadedMetadata = (index: number) => {
		setDurations((durations) => ({
			...durations,
			[index]: audioRefs.current[index].duration,
		}));
	};

	const formatTime = (seconds: number) => {
		if (seconds === undefined) {
			return '00:00';
		}
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = Math.floor(seconds % 60);
		return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
			.toString()
			.padStart(2, '0')}`;
	};

	return (
		<section className='container mt-10 mb-20'>
			<header className='border-b border-t border-black mb-2 grid grid-cols-[3fr_1fr_1fr_1fr] gap-2'>
				<div>Filename</div>
				<div>Time</div>
				<div>Key</div>
				<div>BPM</div>
			</header>
			<ul className='flex flex-col gap-4'>
				{sounds.map((sound, index) => (
					<li className='grid grid-cols-[3fr_1fr_1fr_1fr]' key={index}>
						<div className='flex gap-2 items-center'>
							<Image
								src={getCoverArtUrl(coverArtLocation)}
								width={36}
								height={36}
								alt=''
							/>
							<div className='text-sm overflow-x-scroll hide-scroll-bar'>
								{sound.name}
							</div>
						</div>
						<audio
							// controls
							ref={(el) => {
								if (el) {
									audioRefs.current[index] = el;
								}
							}}
							src={getPreviewUrl(sound.audio_file)}
							onLoadedMetadata={() => handleLoadedMetadata(index)}></audio>

						<div>{formatTime(durations[index])}</div>
					</li>
				))}
			</ul>
		</section>
	);
};

export default PackSounds;
