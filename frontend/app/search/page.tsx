'use client';

import { getCoverArtUrl, getPreviewUrl } from '@/app/api/cloudinary';
import { Pack, Sound } from '@/app/types';
import { AppDispatch, RootState } from '@/redux/store';
import { ArrowRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchSounds } from '../api/api';
import AudioPlayer from '../components/Layout/AudioPlayer';
import PackSounds from '../components/Layout/PackSounds/PackSounds';
import PackSoundsHeader from '../components/Layout/PackSounds/PackSoundsHeader';
import { useToast } from '../components/ui/use-toast';

const SearchPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const search = searchParams.get('query');
	console.log(search);
	const [packs, setPacks] = useState<Pack[]>([]);
	const [sounds, setSounds] = useState<Sound[]>([]);
	const dispatch = useDispatch<AppDispatch>();
	const { results, status } = useSelector(
		(state: RootState) => state.searchReducer
	);
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const soundsData = await searchSounds(search as string);
				const packsMap: { [packId: string]: Pack } = {};

				// Group sounds by pack ID and create corresponding pack objects
				soundsData.forEach((sound) => {
					if (sound.pack) {
						const packId = sound.pack.id.toString();
						if (!packsMap[packId]) {
							packsMap[packId] = {
								...sound.pack,
								sounds: [sound],
							};
						} else {
							packsMap[packId].sounds.push(sound);
						}
					}
				});

				setPacks(Object.values(packsMap));
			} catch (error) {
				console.log(error);
			}
		};

		if (search) {
			fetchData();
		}
	}, [search]);

	const handleSearchChange = (e: any) => {
		setSearchQuery(e.target.value);
	};

	// const handleSearchEnter = (e: any) => {
	// 	if (e.key === 'Enter') {
	// 		dispatch(searchSounds(searchQuery));
	// 		setSearchQuery('');
	// 	}
	// };

	// const handleSearchClick = () => {
	// 	dispatch(searchSounds(searchQuery));
	// };

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
							// onKeyDown={handleSearchEnter}
						/>
					</div>
					<button
						className='bg-purple text-white rounded-md p-1 ml-1 w-8 h-8'
						// onClick={handleSearchClick}
					>
						<ArrowRightIcon className='w-5 h-5 text-white' />
					</button>
				</div>
			</header>
			{status === 'loading' && <div>Loading...</div>}
			{status === 'failed' && <div>Error loading results...</div>}
			<PackSoundsHeader />
			{
				// status === 'succeeded' &&
				packs.map((pack) => (
					<PackSounds
						key={pack.id}
						packId={pack.id.toString()}
						coverArtLocation={pack.cover_art_location}
						sounds={pack.sounds}
					/>
				))
			}
			<AudioPlayer />
		</div>
	);
};

export default SearchPage;
