'use client';

import { searchSounds } from '@/redux/features/searchSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AudioPlayer from '../components/Layout/AudioPlayer';
import PackSounds from '../components/Layout/PackSounds/PackSounds';

const SearchPage = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { results, status } = useSelector((state: RootState) => state.searchReducer);

	useEffect(() => {
		const query = new URLSearchParams(window.location.search).get('query') || '';
		dispatch(searchSounds(query));
	}, [dispatch]);

	return (
		<div className='container'>
			{status === 'loading' && <div>Loading...</div>}
			{status === 'failed' && <div>Error loading results...</div>}
			{status === 'succeeded' && (
				<>
					{results.sounds_by_title.map((pack: any) => (
						<PackSounds
							key={pack.id}
							packId={pack.id}
							coverArtLocation={pack.cover_art_location}
						/>
					))}
				</>
			)}

			<AudioPlayer />
		</div>
	);
};

export default SearchPage;
