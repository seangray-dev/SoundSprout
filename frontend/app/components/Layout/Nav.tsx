'use client';

import { RootState } from '@/redux/store';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import CartPopover from './CartPopover';
import logo from '/public/assets/images/logo-no-background.png';

const Nav = () => {
	const { user, isAuth } = useSelector((state: RootState) => state.authReducer);
	const [isOpen, setIsOpen] = useState(false);
	const username = user?.username || '';

	return (
		<nav className='bg-gray-1 py-8'>
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
					<li className='flex item-center text-white'>
						<Popover open={isOpen} onOpenChange={setIsOpen}>
							<PopoverTrigger asChild>
								<Button variant={'ghost'}>
									<ShoppingCartIcon className='text-white w-6 h-6 hover:text-purple transition-all duration-300' />
								</Button>
							</PopoverTrigger>
							<PopoverContent className='w-[500px] mr-4 bg-gray-1 border-none'>
								<CartPopover setIsOpen={(setIsOpen)} />
							</PopoverContent>
						</Popover>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Nav;
