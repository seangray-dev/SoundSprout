'use client';

import { RootState } from '@/redux/store'; // import your Redux store or the file where RootState is defined
import { UserIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import logo from '/public/assets/images/logo-no-background.png';

const Nav = () => {
	const { user, isAuth } = useSelector((state: RootState) => state.authReducer);
	const username = user?.username || '';

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
					{isAuth ? (
						<li className='underline underline-offset-2 text-white flex gap-2 items-center'>
							<Link href={'/profile'}>{user?.username}</Link>
							<UserIcon className='text-purple w-6' />
						</li>
					) : (
						<li className='py-1 px-4 gap-4 bg-purple rounded-full hover:opacity-70 hover:cursor-pointer transition-opacity duration-300 w-full'>
							<Link href={'/login'}>Login</Link>
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Nav;
