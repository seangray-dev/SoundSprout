import Image from 'next/image';

import Heading from '../components/Utils/Heading';
import LoginForm from '../components/Forms/LoginForm';

const Login = () => {
  return (
    <>
      <main className='bg-gray-1'>
        <section className='2xl:container mx-auto flex flex-col md:grid md: grid-cols-2'>
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
        </section>
      </main>
    </>
  );
};

export default Login;
