import {
	ArrowUpTrayIcon,
	ShoppingCartIcon,
	UserPlusIcon,
} from '@heroicons/react/24/solid';
import Heading from '../Utils/Heading';
import HowItWorksItem from './HowItWorksItem';

const HowItWorks = () => {
	return (
		<section className='container py-10'>
			<Heading level={2} className='text-[28px] uppercase'>
				How It Works
			</Heading>
			<p className='capitalize mb-10'>Find Out How To Get Started.</p>
			<div>
				<ul className='flex flex-col gap-5 md:grid md:grid-cols-3 lg:gap-8'>
					<HowItWorksItem
						icon={<UserPlusIcon className='text-purple w-20 h-20 mx-auto' />}
						title='Create Your Account'
						description='Register and set up your Sound Sprout account.  Get started by clicking the sign-up button.'
					/>
					<HowItWorksItem
						icon={
							<ShoppingCartIcon className='text-purple w-20 h-20 mx-auto' />
						}
						title='Purchase Samples'
						description='Discover unique sound samples from our vast collection. Select your favorites and proceed to checkout.'
					/>
					<HowItWorksItem
						icon={<ArrowUpTrayIcon className='text-purple w-20 h-20 mx-auto' />}
						title='Upload Samples'
						description='Share your own sound samples with the world. Upload your work, add descriptions, and set your price.'
					/>
				</ul>
			</div>
		</section>
	);
};

export default HowItWorks;
