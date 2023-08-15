'use client';

import { getCoverArtUrl, getPreviewUrl } from '@/app/api/cloudinary';
import { searchSounds } from '@/redux/features/searchSlice';
import { AppDispatch, RootState } from '@/redux/store';
import {
	ArrowRightIcon,
	MagnifyingGlassIcon,
	PlayIcon,
	PlusIcon,
	StopIcon
} from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AudioPlayer from '../components/Layout/AudioPlayer';
import PackSoundsHeader from '../components/Layout/PackSounds/PackSoundsHeader';
import { handleAddSoundToCart } from '../components/Utils/cartActions';
import { Button } from '../components/ui/button';
import { useToast } from '../components/ui/use-toast';

const SearchPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const { results, status } = useSelector((state: RootState) => state.searchReducer);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const [durations, setDurations] = useState<{ [key: number]: number }>({});
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchEnter = (e: any) => {
    if (e.key === 'Enter') {
      dispatch(searchSounds(searchQuery));
      setSearchQuery('');
    }
  };

	const handleSearchClick = () => {
    dispatch(searchSounds(searchQuery));
  };

  const handlePlaySound = (index: number) => {
    if (playingIndex !== null) {
      audioRefs.current[playingIndex].pause();
      audioRefs.current[playingIndex].currentTime = 0;
    }
    audioRefs.current[index].play();
    setPlayingIndex(index);
  };

  const handleStopSound = (index: number) => {
    audioRefs.current[index].pause();
    audioRefs.current[index].currentTime = 0;
    setPlayingIndex(null);
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

	useEffect(() => {
    const query = new URLSearchParams(window.location.search).get('query') || '';
    setSearchQuery(query);
    dispatch(searchSounds(query));
  }, [dispatch]);

  return (
    <div className='container my-10'>
        <header className='my-4 flex items-center'>
        		<div className='flex ml-4'>
          		<div className='relative'>
            		<MagnifyingGlassIcon className='w-5 h-5 text-purple absolute left-3 top-[5px]' />
									<input
										className='py-1 px-4 pl-10 w-40 text-black outline-none rounded-md border focus:border-purple'
										type='text'
										placeholder='Search'
										value={searchQuery}
										onChange={handleSearchChange}
										onKeyDown={handleSearchEnter}
									/>
								</div>
								<button
									className='bg-purple text-white rounded-md p-1 ml-1 w-8 h-8'
									onClick={handleSearchClick}
								>
									<ArrowRightIcon className='w-5 h-5 text-white' /> 
          </button>
        </div>
      </header>
			<PackSoundsHeader />
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error loading results...</div>}
      {status === 'succeeded' && (
        <section className='font-light'>
          <ul className='flex flex-col'>
					{
						results.sounds_by_title && results.sounds_by_title.length > 0 ? (
							results.sounds_by_title.map((sound: any, index) => (
								<li
									className='group grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center border-b py-2 text-sm hover:bg-gray-50'
									key={index}
									onMouseEnter={() => setHoveredIndex(index)}
									onMouseLeave={() => setHoveredIndex(null)}
								>
									<div className='flex items-center'>
										<Image
											className='ml-6'
											src={getCoverArtUrl(sound.pack?.cover_art_location || sound.cover_art_location)}
											width={36}
											height={36}
											alt=''
										/>
                    <div className='flex-grow'>
												{playingIndex === index ? (
											<StopIcon
												className='mx-auto w-6 h-6 text-purple cursor-pointer'
												onClick={() => handleStopSound(index)}
											/>
										) : (
											<PlayIcon
												className={`mx-auto w-6 h-6 text-purple hover:cursor-pointer ${index === hoveredIndex ? 'block' : 'hidden'}`}
												onClick={() => handlePlaySound(index)}
											/>
										)}
                    </div>
                  </div>
                  <div className='flex flex-col gap-2 overflow-x-auto hide-scroll-bar ml-10 md:ml-0 mr-4'>
                    <div className='text-sm font-normal'>{sound.name}</div>
                    <div className='flex gap-2'>
                      {sound.tags?.map((tag: { id: string; tag_name: string }) => (
                        <span key={tag.id}>
                          <Link
                            className='text-gray-500 hover:text-purple hover:underline transition-all duration-300'
                            href={`/search?query=${tag.tag_name}`}
                          >
                            {tag.tag_name}
                          </Link>
                        </span>
                      ))}
                    </div>
                  </div>
                  <audio
                    ref={(el) => {
                      if (el) {
                        audioRefs.current[index] = el;
                      }
                    }}
                    src={getPreviewUrl(sound.audio_file)}
                    onLoadedMetadata={() => handleLoadedMetadata(index)}
                  ></audio>
                  <div className='text-gray-500'>{formatTime(durations[index])}</div>
                  <div className='text-gray-500'>{sound.key}</div>
                  <div className='text-gray-500'>{sound.bpm}</div>
                  <div className='flex justify-center'>
									
									<Button
											asChild
											variant='ghost'
											onClick={(event) => handleAddSoundToCart(dispatch, toast, event, sound)}
									>
										<PlusIcon className='text-gray-500 w-5 h-5 -ml-8 hover:cursor-pointer hover:bg-purple hover:text-white transition-all duration-300 rounded-md ' />
									</Button>
                  </div>
                </li>
              ))
            ) : (
              <div>No results found.</div>
            )}
          </ul>
					<AudioPlayer />
        </section>
      )}
    </div>
  );
};

export default SearchPage;
