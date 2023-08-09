'use client';

import { logout } from '@/redux/features/auth-slice';
import { RootState } from '@/redux/store';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import CartPopover from './CartPopover';
import logo from '/public/assets/images/logo-no-background.png';

const Nav = () => {
	const dispatch = useDispatch();
	const { user, isAuth } = useSelector((state: RootState) => state.authReducer);
	const [isOpen, setIsOpen] = useState(false);
	const username = user?.username || '';

	const onLogout = () => {
		console.log('Logout button clicked');
		dispatch(logout());
	};

	return (
		<nav className='bg-gray-1 py-8'>
			<div className='flex justify-between items-center container'>
				<div className='flex justify-between items-center gap-10'>
					<Link href={'/'}>
						<Image src={logo} width={150} alt='sound-sprout-logo' />
					</Link>
					<ul className='flex items-center gap-10 text-white'>
						<li className='relative bg-purple rounded-lg py-1 px-4 hover:underline transition-all duration-300'>
							<Link href={'/ai-melody-generator'}>AI Generator</Link>
							<div className=' absolute bg-white text-black text-center px-2 text-xs rounded -top-2 -right-4 rotate-12'>
								Beta
							</div>
						</li>
						<li className='hover:underline hover:text-purple transition-all duration-300'>
							<Link href={'/upload'}>Upload</Link>
						</li>
					</ul>
				</div>
				<ul className='flex items-center gap-4 text-white'>
					{isAuth ? (
						<>
							<li className='underline underline-offset-2 text-white flex gap-2 items-center'>
								<Link href={'/profile'}>{user?.username}</Link>
								<UserIcon className='text-purple w-6' />
							</li>
							<li>
								<button
									onClick={onLogout}
									className='py-1 px-4 gap-4 bg-purple rounded-full hover:opacity-70 hover:cursor-pointer transition-opacity duration-300 w-full'>
									Logout
								</button>
							</li>
						</>
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
								<CartPopover setIsOpen={setIsOpen} />
							</PopoverContent>
						</Popover>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Nav;
