'use client';

import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { useContext, useEffect, useState } from 'react';
import { fetchUser, updateUser } from '../api/api';
import { UserContext } from '../hooks/context/UserContext';

const ProfilePage = () => {
	const { user, setUser, logout } = useContext(UserContext);
	const [isEditing, setIsEditing] = useState(false);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	useEffect(() => {
		const getUser = async () => {
			try {
				const data = await fetchUser();
				console.log('getUser', data);
				setUser(data);
				setUsername(data.username);
				setEmail(data.email);
				setFirstName(data.first_name);
				setLastName(data.last_name);
			} catch (error) {
				console.error('Failed to fetch user:', error);
				logout(); // User data failed to fetch, user not authenticated, trigger logout
			}
		};

		getUser();
	}, []);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		console.log('Submitting form'); // New console log
		try {
			const updatedUser = await updateUser({ username, email, firstName, lastName });
			setUser(updatedUser);
			setUsername(updatedUser.username);
			setEmail(updatedUser.email);
			setFirstName(updatedUser.first_name);
			setLastName(updatedUser.last_name);
			setIsEditing(false);
		} catch (error) {
			console.error('Failed to update user:', error);
		}
	};
	
	if (!user) {
		return (
			<div className='mx-auto text-center min-h-[50vh] grid place-items-center'>
				Loading...
			</div>
		);
	}

	if (isEditing) {
		return (
			<main className='container my-10'>
				<form 
					onSubmit={handleSubmit}
					className="flex flex-col gap-4" // To orient the form vertically
				>
					<label>
						Username:
						<input value={username} onChange={(e) => setUsername(e.target.value)} />
					</label>
					<label>
						Email:
						<input value={email} onChange={(e) => setEmail(e.target.value)} />
					</label>
					<label>
						First Name:
						<input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
					</label>
					<label>
						Last Name:
						<input value={lastName} onChange={(e) => setLastName(e.target.value)} />
					</label>
					<button type="submit">Submit</button>
      </form>
    </main>
  );
}
	
	

	return (
		<main className='container my-10'>
			<div className='w-3/4 md:w-1/2 mx-auto font-bold tracking-wide'>
				<header className='mb-4 border-b border-black flex justify-between'>
					<h1 className='font-bold text-2xl'>Profile</h1>
					<PencilSquareIcon className='w-5 hover:opacity-50 hover:cursor-pointer transition-all' onClick={() => setIsEditing(true)} />
				</header>
					<div className='flex flex-col gap-4'>
						<p className='flex flex-col md:flex-row  justify-between'>
							Username: <span className='font-normal'>{user.username}</span>
						</p>
						<p className='flex flex-col md:flex-row  justify-between'>
							Email: <span className='font-normal'>{user.email}</span>
						</p>
						<p className='flex flex-col md:flex-row  justify-between'>
							First Name: <span className='font-normal'>{user.first_name}</span>
						</p>
						<p className='flex flex-col md:flex-row  justify-between'>
							Last Name: <span className='font-normal'>{user.last_name}</span>
						</p>
						<p className='flex flex-col md:flex-row  justify-between'>
							User ID: <span className='font-normal'>{user.id}</span>
						</p>
						<p className='flex flex-col md:flex-row  justify-between'>
							Password:{' '}
							<p className='font-normal text-purple hover:cursor-pointer hover:underline'>
								Change Password
							</p>
						</p>
						<p className='flex flex-col md:flex-row justify-between'>
							Delete Sound Sprout Account:{' '}
							<p className='font-normal text-red-500 hover:cursor-pointer hover:underline'>
								Delete Account
							</p>
						</p>
					</div>
				</div>
			</main>
	);
};

export default ProfilePage;
