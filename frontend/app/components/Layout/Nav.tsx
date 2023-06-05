import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bars2Icon } from '@heroicons/react/24/solid';
import logo from '/public/assets/images/logo-no-background.png';

const Nav = () => {
  return (
    <nav className='bg-gray-1 py-4'>
      <div className='flex justify-between items-center container'>
        <Link href={'/'}>
          <Image src={logo} width={150} alt='sound-sprout-logo' />
        </Link>
        <ul className='flex items-center gap-4 text-white'>
          <li className='hover:underline transition-all'>
            <Link href={'/upload'}>Upload</Link>
          </li>
          <li className='py-1 px-4 gap-4 bg-purple rounded-full hover:opacity-70 hover:cursor-pointer transition-opacity duration-300 w-full'>
            <Link href={'/login'}>Login</Link>
          </li>
        </ul>
        {/* <button>
          <Bars2Icon className='w-6 h-6 text-white' />
        </button> */}
      </div>
    </nav>
  );
};

export default Nav;
