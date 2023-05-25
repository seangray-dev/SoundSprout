import Heading from '../Utils/Heading';
import Image from 'next/image';
import Btn_Primary from '../Buttons/Btn_Primary';
import { RocketLaunchIcon } from '@heroicons/react/24/solid';
import FeaturedPack from '../../../public/assets/images/soul-vibes-cover-art.jpeg';

const Header = () => {
  return (
    <header className='container flex flex-col-reverse gap-10 md:gap-8 mt-10 md:grid md:grid-cols-2 mb-10'>
      <div className='md:self-center'>
        <Heading level={1} className='text-[28px] mb-2 md:text-4xl lg:text-6xl'>
          Discover Unique
          <br
            className='hidden md:block
          '
          />{' '}
          Sound Samples
        </Heading>
        <p className='lg:text-[20px] mb-6'>
          Find, purchase, and sell exceptional sound samples from creators
          worldwide. Your sonic journey begins here.
        </p>
        <Btn_Primary>
          <div className='mx-auto flex items-center gap-4'>
            <RocketLaunchIcon className='text-white w-5 h-5'></RocketLaunchIcon>
            Get Started
          </div>
        </Btn_Primary>
      </div>
      <div className='place-self-end'>
        <Image
          src={FeaturedPack}
          className='rounded-2xl hover:cursor-pointer'
          alt={'featured pack'}
          priority
        />
      </div>
    </header>
  );
};

export default Header;
