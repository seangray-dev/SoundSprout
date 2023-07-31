'use client';

import { RootState } from '@/redux/store';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { changeUserPassword, deleteUser, fetchUser, updateUser } from '../api/api';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { User } from '../types';

const ProfilePage = () => {
  const auth = useSelector((state: RootState) => state.authReducer);
  const { isAuth } = auth;
  const [user, setUser] = useState<User>();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  // Change Password Dialog
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

	// Delete Account Dialog
	const [deleteConfirm, setDeleteConfirm] = useState(false);

	const getUser = async () => {
		try {
			const data = await fetchUser();
			console.log('getUser', data);
			setUser(data);
			setFormData({
				username: data?.username || "",
				email: data?.email || "",
				firstName: data?.first_name || "",
				lastName: data?.last_name || "",
			});
		} catch (error) {
			console.error('Failed to fetch user:', error);
		}
	};

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

	const handleDialogOpen = () => {
		setOpen(true);
		setFormData({
			username: user?.username || "",
			email: user?.email || "",
			firstName: user?.first_name || "",
			lastName: user?.last_name || "",
		});
	};

	const handleFormSubmit = async (e: any) => {
    console.log("Submit button was clicked");
    e.preventDefault();
		console.log('l')
    try {
				const data = {
					username: formData.username,
					email: formData.email,
					first_name: formData.firstName,
					last_name: formData.lastName
			}; 
		
        const response = await updateUser(data);
        console.log(response); // Debugging line
        if (response.success) {
					console.log(formData)
					setUser(response.user);
					setFormData({
							username: response.user.username,
							email: response.user.email,
							firstName: response.user.first_name,
							lastName: response.user.last_name,
					});
					setOpen(false); // Close the dialog
			} else {
					alert(response.message);
			}
			
    } catch (error) {
        console.error('Failed to update user:', error);
    }
};


	const handleDeleteAccount = async () => {
		try {
			await deleteUser();  
			localStorage.removeItem('token');
			router.push('/login');
		} catch (error) {
			console.error('Failed to delete account:', error);
		}
	};
	
	const handlePasswordSubmit = async (e: any) => {
		e.preventDefault();
		if (newPassword !== confirmPassword) {
			alert("New passwords don't match!");
		} else {
			try {
				await changeUserPassword(newPassword);
			} catch (error) {
				console.error('Failed to change password:', error);
			}
		}
	};

  useEffect(() => {

    if (isAuth) {
      getUser();
    } else {
      router.push('/login');
    }
  }, [isAuth, router]);

  if (!isAuth) {
    return (
      <div className='mx-auto text-center min-h-[50vh] grid place-items-center text-[28px] mb-10 uppercase'>
        Redirecting...
      </div>
    );
  }

  return (
			<>
				<main className='container my-10'>
					<div className='w-3/4 md:w-1/2 mx-auto font-bold tracking-wide'>
						<header className='mb-4 border-b border-black flex justify-between'>
							<h1 className='font-bold text-2xl'>Profile</h1>						
							<Dialog open={open} onOpenChange={setOpen}>
							<DialogTrigger onClick={handleDialogOpen}>
								<PencilSquareIcon className='w-5 hover:opacity-50 hover:cursor-pointer transition-all' />
							</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Edit Profile</DialogTitle>
									</DialogHeader>
									<form onSubmit={handleFormSubmit}>
										<input
											type="text"
											name="username"
											value={formData.username}
											onChange={handleInputChange}
											placeholder="Username"
										/>
										<br />
										<input
											type="email"
											name="email"
											value={formData.email}
											onChange={handleInputChange}
											placeholder="Email"
										/>
										<br />
										<input
											type="text"
											name="firstName"
											value={formData.firstName}
											onChange={handleInputChange}
											placeholder="First Name"
										/>
										<br />
										<input
											type="text"
											name="lastName"
											value={formData.lastName}
											onChange={handleInputChange}
											placeholder="Last Name"
										/>
										<br />
										<button type="submit">Save Changes</button>
									</form>
								</DialogContent>
							</Dialog>
						</header>
						<div className='flex flex-col gap-4'>
							<p className='flex flex-col md:flex-row  justify-between'>
								Username: <span className='font-normal'>{user?.username}</span>
							</p>
							<p className='flex flex-col md:flex-row  justify-between'>
								Email: <span className='font-normal'>{user?.email}</span>
							</p>
							<p className='flex flex-col md:flex-row  justify-between'>
								First Name:{' '}
								<span className='font-normal'>{user?.first_name}</span>
							</p>
							<p className='flex flex-col md:flex-row  justify-between'>
								Last Name: <span className='font-normal'>{user?.last_name}</span>
							</p>
							<p className='flex flex-col md:flex-row  justify-between'>
								User ID: <span className='font-normal'>{user?.id}</span>
							</p>
							<p className='flex flex-col md:flex-row  justify-between'>
								Password:{' '}
								
							<Dialog>
								<DialogTrigger>
									<span className='font-normal text-purple hover:cursor-pointer hover:underline'>
									Change Password
									</span>
								</DialogTrigger>
								<DialogContent>
									<DialogTitle>Change Password</DialogTitle>
									<form onSubmit={handlePasswordSubmit}>
										<label>
											New Password
											<input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
										</label>
										<br />
										<label>
											Confirm New Password
											<input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
										</label>
										<br />
										<button type="submit">Submit</button>
									</form>
								</DialogContent>
							</Dialog>
							</p>
							<p className='flex flex-col md:flex-row justify-between'>
								Delete Sound Sprout Account:
								
								<Dialog>
									<DialogTrigger>
										<span className='font-normal text-red-500 hover:cursor-pointer hover:underline'>
											Delete Account
										</span>
									</DialogTrigger>
									<DialogContent>
										<DialogTitle>Confirm Account Deletion</DialogTitle>
										<DialogDescription>
											Are you sure you want to delete your account? This action cannot be undone.
										</DialogDescription>
										<button onClick={() => setDeleteConfirm(true)}>Yes, Delete</button>
										<button onClick={() => setDeleteConfirm(false)}>No, Cancel</button>
									</DialogContent>
								</Dialog>
							</p>
						</div>
					</div>
				</main>
			</>
		);
	};

export default ProfilePage;
