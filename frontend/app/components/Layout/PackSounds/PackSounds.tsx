import { getCoverArtUrl } from '@/app/api/cloudinary';
import { Pack, PackSoundsProps, Sound, Tag } from '@/app/types';
import {
	resetCurrentSound,
	setCurrentSound,
} from '@/redux/features/currentSound-slice';
import { RootState } from '@/redux/store';
import {
	ChevronUpDownIcon,
	PlayIcon,
	PlusIcon,
	StopIcon,
} from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddToCart } from '../../Utils/cartActions';
import { Button } from '../../ui/button';
import { useToast } from '../../ui/use-toast';

const PackSounds = ({ packId, coverArtLocation }: PackSoundsProps) => {
	const dispatch = useDispatch();
	const { toast } = useToast();
	const currentSound = useSelector((state: RootState) => state.currentSound);
	const isCurrentPackPlaying = currentSound.pack?.id.toString() === packId;
	const { field, order } = useSelector((state: RootState) => state.sortSounds);
	const [sounds, setSounds] = useState<Sound[]>([]);
	const [soundTags, setSoundTags] = useState<{ [key: number]: Tag[] }>({});
	const audioRefs = useRef<HTMLAudioElement[]>([]);
	const [durations, setDurations] = useState<{ [key: number]: number }>({});
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	useEffect(() => {
		const fetchSoundsAndTags = async () => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/packs/${packId}/sounds`
			);
			const soundsData = await response.json();

			const sortedSoundsData = [...soundsData].sort((a, b) => {
				// Here, we consider that field is either 'name', 'duration', 'key', or 'bpm'
				if (a[field] < b[field]) {
					return order === 'asc' ? -1 : 1;
				} else if (a[field] > b[field]) {
					return order === 'asc' ? 1 : -1;
				} else {
					return 0;
				}
			});

			setSounds(sortedSoundsData);

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

			setSoundTags(soundTags);
		};

		fetchSoundsAndTags();
	}, [packId, field, order]);

	useEffect(() => {
		audioRefs.current = audioRefs.current.slice(0, sounds.length);
	}, [sounds]);

	function getPreviewUrl(audio_file: string) {
		return `${process.env.NEXT_PUBLIC_CLOUDINARY_SOUND_URL}${audio_file}`;
	}

	const handlePlay = (index: number) => {
		if (isCurrentPackPlaying && currentSound.soundIndex === index) {
			dispatch(resetCurrentSound());
		} else {
			dispatch(
				setCurrentSound({
					id: sounds[index].id,
					pack: sounds[index].pack,
					soundIndex: index,
					coverArt: getCoverArtUrl(coverArtLocation),
					name: sounds[index].name,
					key: sounds[index].key,
					bpm: sounds[index].bpm,
					audio_file: getPreviewUrl(sounds[index].audio_file),
					isPlaying: true,
					price: sounds[index].price,
					purchase_count: sounds[index].purchase_count,
					created_at: sounds[index].created_at,
					modified_at: sounds[index].modified_at,
				})
			);
		}
	};

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
		<>
			<section className='font-light'>
				<ul className='flex flex-col'>
					{sounds.map((sound, index) => (
						<li
							className='group grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center border-b py-2 text-sm hover:bg-gray-50'
							key={index}
							onClick={() => handlePlay(index)}
							onMouseEnter={() => setHoveredIndex(index)}
							onMouseLeave={() => setHoveredIndex(null)}>
							<div className='flex items-center'>
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
											index === hoveredIndex &&
											!(
												isCurrentPackPlaying &&
												currentSound.soundIndex === index
											)
												? 'block'
												: 'hidden'
										}`}
									/>
									<StopIcon
										className={`mx-auto w-6 h-6 text-purple ${
											isCurrentPackPlaying && currentSound.soundIndex === index
												? 'block'
												: 'hidden'
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

							<audio
								ref={(el) => {
									if (el) {
										audioRefs.current[index] = el;
									}
								}}
								src={getPreviewUrl(sound.audio_file)}
								onLoadedMetadata={() => handleLoadedMetadata(index)}></audio>

							<div className='text-gray-500'>
								{formatTime(durations[index])}
							</div>
							<div className='text-gray-500'>{sound.key}</div>
							<div className='text-gray-500'>{sound.bpm}</div>
							<div className='flex justify-center'>
								<Button
									asChild
									variant='ghost'
									onClick={(event) =>
										handleAddToCart(dispatch, toast, event, sound)
									}>
									<PlusIcon className='text-gray-500 w-5 h-5 -ml-8  hover:cursor-pointer hover:bg-purple hover:text-white transition-all duration-300' />
								</Button>
							</div>
						</li>
					))}
				</ul>
			</section>
		</>
	);
};

export default PackSounds;
