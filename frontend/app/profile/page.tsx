'use client';

import { RootState } from '@/redux/store';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { changeUserPassword, deleteUser, fetchUser, updateUser } from '../api/api';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
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
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
	const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
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
        if (response.success) {
					console.log(formData)
					setUser(response.user);
					setFormData({
							username: response.user.username,
							email: response.user.email,
							firstName: response.user.first_name,
							lastName: response.user.last_name,
					});
					setOpen(false);
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
            setOpenPasswordDialog(false);
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
    <Card className='container my-10 w-3/4 md:w-1/2 mx-auto font-bold tracking-wide'>
      <CardHeader className='mb-4 border-b border-black'>
        <div className='flex justify-between w-full items-center'>
          <CardTitle className='font-bold text-2xl'>Profile</CardTitle>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger onClick={handleDialogOpen}>
              <PencilSquareIcon className='w-5 hover:opacity-50 hover:cursor-pointer transition-all' />
            </DialogTrigger>
            <DialogContent>
								<DialogHeader>
									<DialogTitle>Edit Profile</DialogTitle>
								</DialogHeader>
								<form className="space-y-4" onSubmit={handleFormSubmit}>
									<div className="flex flex-col">
										<label className="text-gray-600 font-bold">Username</label>
										<input
											className="px-4 py-2 border rounded-lg focus:outline-none focus:border-black transition duration-300"
											type="text"
											name="username"
											value={formData.username}
											onChange={handleInputChange}
										/>
									</div>
									<div className="flex flex-col">
										<label className="text-gray-600 font-bold">Email</label>
										<input
											className="px-4 py-2 border rounded-lg focus:outline-none focus:border-black transition duration-300"
											type="email"
											name="email"
											value={formData.email}
											onChange={handleInputChange}
										/>
									</div>
									<div className="flex flex-col">
										<label className="text-gray-600 font-bold">First Name</label>
										<input
											className="px-4 py-2 border rounded-lg focus:outline-none focus:border-black transition duration-300"
											type="text"
											name="firstName"
											value={formData.firstName}
											onChange={handleInputChange}
										/>
									</div>
									<div className="flex flex-col">
										<label className="text-gray-600 font-bold">Last Name</label>
										<input
											className="px-4 py-2 border rounded-lg focus:outline-none focus:border-black transition duration-300"
											type="text"
											name="lastName"
											value={formData.lastName}
											onChange={handleInputChange}
										/>
									</div>
									<button
										className="w-full py-2 px-4 rounded-lg bg-purple rounded-full text-white font-bold hover:opacity-70 transition-opacity duration-300 w-full"
										type="submit"
									>
										Save Changes
									</button>
								</form>
							</DialogContent>
          </Dialog> 
        </div>        
      </CardHeader>
			
      <CardContent className='flex flex-col space-y-4 gap-4'>
				<p className='flex flex-col md:flex-row justify-between space-y-4'>
					Username: <span className='font-normal'>{user?.username}</span>
				</p>
				<p className='flex flex-col md:flex-row justify-between space-y-4'>
					Email: <span className='font-normal'>{user?.email}</span>
				</p>
				<p className='flex flex-col md:flex-row justify-between space-y-4'>
					First Name: <span className='font-normal'>{user?.first_name}</span>
				</p>
				<p className='flex flex-col md:flex-row justify-between space-y-4'>
					Last Name: <span className='font-normal'>{user?.last_name}</span>
				</p>
				<p className='flex flex-col md:flex-row justify-between space-y-4'>
					Password:  
          <Dialog open={openPasswordDialog} onOpenChange={setOpenPasswordDialog}>
            <DialogTrigger>
						<button
  className='font-normal border-purple hover:bg-purple hover:text-white py-1 px-2 rounded transition-colors duration-200'>
  Change Password
</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handlePasswordSubmit}>
                <div className="flex flex-col">
                  <label className="text-gray-600 font-bold">New Password</label>
                  <input
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:border-black transition duration-300"
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-600 font-bold">Confirm New Password</label>
                  <input
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:border-black transition duration-300"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  className="w-full py-2 px-4 rounded-lg bg-purple rounded-full text-white font-bold hover:opacity-70 transition-opacity duration-300 w-full"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </p>
      </CardContent>
      <CardFooter className='flex flex-col md:flex-row justify-between'>
        Delete Sound Sprout Account: 
        <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
          <DialogTrigger>
					<button
  className='font-normal border-red-600 hover:bg-red-600 hover:text-white py-1 px-2 rounded transition-colors duration-200'>
  Delete Account
</button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Account Deletion</DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-gray-600 font-bold">
              Are you sure you want to delete your account? This action cannot be undone.
            </DialogDescription>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => setDeleteConfirm(true)}
                className="w-full py-2 px-4 rounded-lg bg-red-500 rounded-full text-white font-bold hover:opacity-70 transition-opacity duration-300 w-full"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => {setDeleteConfirm(false); setOpenDeleteDialog(false);}}
                className="w-full py-2 px-4 rounded-lg bg-gray-300 rounded-full text-black font-bold hover:opacity-70 transition-opacity duration-300 w-full"
              >
                No, Cancel
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

export default ProfilePage;
