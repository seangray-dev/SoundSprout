'use client';

import AudioPlayer from '../components/Layout/AudioPlayer';
import PackSounds from '../components/Layout/PackSounds/PackSounds';

const SearchPage = () => {
	return (
		<div className='container'>
			<PackSounds />
			<AudioPlayer />
		</div>
	);
};

export default SearchPage;
