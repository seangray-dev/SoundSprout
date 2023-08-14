import Heading from '../components/Utils/Heading';
import MusicGenForm from './Music-Gen-Form';

const AIMelodyGenerator = () => {
	return (
		<section className='container my-10'>
			<Heading className='text-3xl' level={1}>
				AI Sample Generator
			</Heading>
			<div className='mt-4 flex flex-col gap-4'>
				<p>
					This innovative tool allows you to create personalized music
					compositions using the power of artificial intelligence.
				</p>
				<p>
					The model will generate 5 seconds of audio based on the your
					selections you provided. Simply select your preferred music style, and
					optionally upload a seed file to influence the musical direction. Once
					you've made your selections, click the "Generate" button. The model
					will then try to follow the description provided. You can preview your
					generated music right on the page, and even download it if you wish.
				</p>
			</div>
			<MusicGenForm />
		</section>
	);
};

export default AIMelodyGenerator;
