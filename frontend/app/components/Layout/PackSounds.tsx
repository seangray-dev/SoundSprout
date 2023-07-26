import { getCoverArtUrl } from '@/app/api/cloudinary';
import { Pack, PackSoundsProps, Sound } from '@/app/types';
import {
	ChevronUpDownIcon,
	PlayIcon,
	StopIcon,
} from '@heroicons/react/24/solid';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const PackSounds = ({ packId, coverArtLocation }: PackSoundsProps) => {
	const [sounds, setSounds] = useState<Sound[]>([]);
	const [durations, setDurations] = useState<Record<number, number>>({});
	const [playingSoundIndex, setPlayingSoundIndex] = useState<number | null>(
		null
	);
	const audioRefs = useRef<HTMLAudioElement[]>([]);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
		<section className='container mt-10 mb-20 font-light'>
			<header className='border-t border-b text-sm text-gray-500 grid grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 py-2'>
				<div className='ml-10'>Pack</div>
				<div>
					<button className='flex items-center'>
						Filename <ChevronUpDownIcon className='w-4 h-4' />
					</button>
				</div>
				<div>
					<button className='flex items-center'>
						Time <ChevronUpDownIcon className='w-4 h-4' />
					</button>
				</div>
				<div>
					<button className='flex items-center'>
						Key <ChevronUpDownIcon className='w-4 h-4' />
					</button>
				</div>
				<div>
					<button className='flex items-center'>
						BPM <ChevronUpDownIcon className='w-4 h-4' />
					</button>
				</div>
			</header>
			<ul className='flex flex-col'>
				{sounds.map((sound, index) => (
					<li
						className='group grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center border-b py-2 text-sm hover:bg-gray-50'
						key={index}
						onClick={() =>
							setPlayingSoundIndex(index === playingSoundIndex ? null : index)
						}
						onMouseEnter={() => setHoveredIndex(index)}
						onMouseLeave={() => setHoveredIndex(null)}>
						<div className='flex items-center'>
							<input
								type='checkbox'
								name=''
								id=''
								onClick={(e) => {
									e.stopPropagation();
								}}
							/>
							<Image
								className='ml-6'
								src={getCoverArtUrl(coverArtLocation)}
								width={36}
								height={36}
								alt=''
							/>
							<div className='flex-grow'>
								<PlayIcon
									className={`mx-auto w-6 h-6 text-purple ${
										index === hoveredIndex && index !== playingSoundIndex
											? 'block'
											: 'hidden'
									}`}
								/>
								<StopIcon
									className={`mx-auto w-6 h-6 text-purple ${
										index === playingSoundIndex ? 'block' : 'hidden'
									}`}
								/>
							</div>
						</div>
						<div className='flex gap-2 items-center'>
							<div className='text-sm font-normal overflow-x-scroll hide-scroll-bar'>
								{sound.name}
							</div>
						</div>
						{/* <audio
							// controls
							ref={(el) => {
								if (el) {
									audioRefs.current[index] = el;
								}
							}}
							src={getPreviewUrl(sound.audio_file)}
							onLoadedMetadata={() => handleLoadedMetadata(index)}></audio> */}

						<div className='text-gray-500'>{formatTime(durations[index])}</div>
						<div className='text-gray-500'>{sound.key}</div>
						<div className='text-gray-500'>{sound.bpm}</div>
					</li>
				))}
			</ul>
		</section>
	);
};

export default PackSounds;
