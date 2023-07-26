import Image from 'next/image';
import LoginForm from '../components/Forms/LoginForm';
import Heading from '../components/Utils/Heading';

const Login = () => {
	return (
		<>
			<section className='bg-gray-1 h-full flex items-center justify-center'>
				<div className='2xl:container mx-auto flex flex-col md:grid md: grid-cols-2'>
					<Image
						src={'/assets/images/login-signup-header.jpeg'}
						width={1000}
						height={1000}
						alt='producer in studio'
						className='mx-auto h-full object-cover object-center'
					/>
					<div className='px-8 mt-8 mb-10'>
						<Heading level={1} className='text-white text-4xl mb-5'>
							Login
						</Heading>
						<p className='text-white'>
							Welcome! Enter your details and start exploring, collecting and
							selling samples.
						</p>
						<LoginForm />
					</div>
				</div>
			</section>
		</>
	);
};

export default Login;
