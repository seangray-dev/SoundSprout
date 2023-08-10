'use client';

import Heading from '../components/Utils/Heading';
import UploadForm from './UploadForm/UploadForm';

const Upload = () => {
	return (
		<section className='container'>
			<div className='flex flex-col items-center gap-8 my-10'>
				<Heading className='text-3xl' level={1}>
					Upload
				</Heading>
				<p className='text-center w-2/3'>
					Here, you can share your creative sound samples and unique audio packs
					with our community of sound enthusiasts. Whether you've crafted
					cutting-edge beats or synthesized soothing melodies, this platform is
					designed to make uploading your sounds simple and seamless. Start by
					filling out the details of your pack, add individual sound files, and
					set the desired price. Once you've organized everything to your
					satisfaction, hit the submit button, and your sounds will be available
					to artists and producers all over the world.
				</p>
			</div>
			<div className='grid place-items-center min-h-full'>
				<UploadForm />
			</div>
		</section>
	);
};

export default Upload;
