import { getCoverArtUrl } from '@/app/api/cloudinary';
import { Pack, PackSoundsProps, Sound, Tag } from '@/app/types';
import {
	ChevronUpDownIcon,
	PlayIcon,
	StopIcon,
} from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useReducer, useRef, useState } from 'react';

type State = {
	sounds: Sound[];
	soundTags: Record<number, Tag[]>;
	durations: Record<number, number>;
};

type Action =
	| { type: 'setSounds'; payload: Sound[] }
	| { type: 'setSoundTags'; payload: Record<number, Tag[]> }
	| { type: 'setDurations'; payload: Record<number, number> };

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'setSounds':
			return { ...state, sounds: action.payload };
		case 'setSoundTags':
			return { ...state, soundTags: action.payload };
		case 'setDurations':
			return { ...state, durations: action.payload };
		default:
			return state;
	}
};

const PackSounds = ({ packId, coverArtLocation }: PackSoundsProps) => {
	const initialState: State = {
		sounds: [],
		soundTags: {},
		durations: {},
	};
	const [state, dispatch] = useReducer(reducer, initialState);
	const { sounds, soundTags, durations } = state;
	const [playingSoundIndex, setPlayingSoundIndex] = useState<number | null>(
		null
	);
	const audioRefs = useRef<HTMLAudioElement[]>([]);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
	const [sortField, setSortField] = useState<
		'name' | 'duration' | 'key' | 'bpm'
	>('name');

	useEffect(() => {
		const fetchSoundsAndTags = async () => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/packs/${packId}/sounds`
			);
			const soundsData = await response.json();

			// Fetch the tags for each sound concurrently using Promise.all
			const tagsPromises = soundsData.map(async (sound: Sound) => {
				const tagResponse = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/sounds/${sound.id}/tags/`
				);
				const tags = await tagResponse.json();
				return { soundId: sound.id, tags };
			});

			const tagsForSounds = await Promise.all(tagsPromises);

			const soundTags: { [key: number]: Tag[] } = {};
			tagsForSounds.forEach(({ soundId, tags }) => {
				soundTags[soundId] = tags;
			});

			console.log('Tags for sounds', tagsForSounds);
			console.log('Sound tags object', soundTags);

			dispatch({ type: 'setSounds', payload: soundsData });
			dispatch({ type: 'setSoundTags', payload: soundTags });
		};

		fetchSoundsAndTags();
	}, [packId]);

	useEffect(() => {
		audioRefs.current = audioRefs.current.slice(0, sounds.length);
	}, [sounds]);

	function getPreviewUrl(audio_file: string) {
		return `${process.env.NEXT_PUBLIC_CLOUDINARY_SOUND_URL}${audio_file}`;
	}

	const handleLoadedMetadata = (index: number) => {
		dispatch({
			type: 'setDurations',
			payload: {
				...durations,
				[index]: audioRefs.current[index].duration,
			},
		});
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

	const handleSort = (field: 'name' | 'duration' | 'key' | 'bpm') => {
		if (field !== sortField) {
			setSortField(field);
			setSortOrder('asc');
		} else {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
		}

		const sortedSounds = [...sounds].sort((a, b) => {
			let compareA: number | string, compareB: number | string;

			switch (field) {
				case 'name':
				case 'key':
					compareA = a[field];
					compareB = b[field];
					break;
				case 'duration':
					compareA = durations[a.id];
					compareB = durations[b.id];
					break;
				case 'bpm':
					compareA = a[field];
					compareB = b[field];
					break;
			}

			if (sortOrder === 'asc') {
				return compareA < compareB ? -1 : 1;
			} else {
				return compareA > compareB ? -1 : 1;
			}
		});

		dispatch({ type: 'setSounds', payload: sortedSounds });
	};

	return (
		<section className='container mt-10 mb-20 font-light'>
			<header className='border-t border-b text-sm text-gray-500 grid grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 py-2'>
				<div className='ml-10'>Pack</div>
				<div>
					<button
						className='flex items-center ml-10 md:ml-0'
						onClick={() => handleSort('name')}>
						Filename <ChevronUpDownIcon className='w-4 h-4' />
					</button>
				</div>
				<div>
					<button
						className='flex items-center'
						onClick={() => handleSort('duration')}>
						Time <ChevronUpDownIcon className='w-4 h-4' />
					</button>
				</div>
				<div>
					<button
						className='flex items-center'
						onClick={() => handleSort('key')}>
						Key <ChevronUpDownIcon className='w-4 h-4' />
					</button>
				</div>
				<div>
					<button
						className='flex items-center -ml-3'
						onClick={() => handleSort('bpm')}>
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
								className='ml-2'
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

						<div className='flex flex-col gap-2 overflow-x-auto hide-scroll-bar ml-10 md:ml-0 mr-4'>
							<div className='text-sm font-normal'>{sound.name}</div>
							<div className='flex gap-2'>
								{soundTags[sound.id]?.map((tag) => {
									return (
										<span key={tag.id}>
											<Link
												className='text-gray-500 hover:text-purple hover:underline transition-all duration-300'
												href={`/search?query=${tag.tag_name}`}>
												{tag.tag_name}
											</Link>
										</span>
									);
								})}
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
