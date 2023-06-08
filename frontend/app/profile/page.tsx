'use client';

import { useEffect, useContext } from 'react';
import Nav from '../components/Layout/Nav';
import Footer from '../components/Layout/Footer';
import { fetchUser } from '../api/api';
import { UserContext } from '../hooks/context/UserContext';
import { PencilSquareIcon } from '@heroicons/react/24/solid';

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await fetchUser();
        console.log('getUser', data);
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    getUser();
  }, []);

  if (!user) {
    return (
      <>
        <Nav />
        <div className='mx-auto text-center min-h-[50vh] grid place-items-center'>
          Loading...
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className='container my-10'>
        <div className='w-3/4 md:w-1/2 mx-auto font-bold tracking-wide'>
          <header className='mb-4 border-b border-black flex justify-between'>
            <h1 className='font-bold text-2xl'>Profile</h1>
            <PencilSquareIcon className='w-5 hover:opacity-50 hover:cursor-pointer transition-all' />
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
      <Footer />
    </>
  );
};

export default ProfilePage;
