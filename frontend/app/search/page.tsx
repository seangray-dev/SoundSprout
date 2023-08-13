'use client';

import { searchSounds } from '@/redux/features/searchSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AudioPlayer from '../components/Layout/AudioPlayer';
import PackSounds from '../components/Layout/PackSounds/PackSounds';
import SoundComponent from '../components/Layout/PackSounds/searchSounds';

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
					<h2>Sounds by Title</h2>
											{results.sounds_by_title && results.sounds_by_title.length > 0 ? (
							results.sounds_by_title.map((sound: any) => (
								<SoundComponent key={sound.id} sound={sound} tags={sound.tags} />
							))
						) : (
							<p>No sounds found by title.</p>
						)}


				</>
			)}

			<AudioPlayer />
		</div>
	);
};

export default SearchPage;