import React from 'react';
import Image from 'next/image';
import { Bars2Icon } from '@heroicons/react/24/solid';
import logo from '../../../public/assets/images/logo-no-background.png';

const Nav = () => {
  return (
    <nav className='bg-gray-1 py-4'>
      <div className='flex justify-between items-center container'>
        <Image src={logo} width={150} alt='sound-sprout-logo' />
        <button>
          <Bars2Icon className='w-6 h-6 text-white' />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
