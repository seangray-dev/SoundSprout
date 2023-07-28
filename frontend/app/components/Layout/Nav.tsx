'use client';

import { logout } from '@/redux/features/auth-slice'; // import the logout action
import { RootState } from '@/redux/store'; // import your Redux store or the file where RootState is defined
import { UserIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '/public/assets/images/logo-no-background.png';

const Nav = () => {
	const dispatch = useDispatch(); // create a dispatch function
	const { user, isAuth } = useSelector((state: RootState) => state.authReducer);
	const username = user?.username || '';

	const onLogout = () => {
    console.log('Logout button clicked');
    dispatch(logout());
};


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
						<>
							<li className='underline underline-offset-2 text-white flex gap-2 items-center'>
								<Link href={'/profile'}>{user?.username}</Link>
								<UserIcon className='text-purple w-6' />
							</li>
							<li>
								<button onClick={onLogout} className='py-1 px-4 gap-4 bg-purple rounded-full hover:opacity-70 hover:cursor-pointer transition-opacity duration-300 w-full'>
									Logout
								</button>
							</li>
						</>
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
