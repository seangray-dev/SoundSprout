'use client';

import { useEffect, useState, useContext } from 'react';
import Nav from '../components/Layout/Nav';
import Footer from '../components/Layout/Footer';
import { fetchUser } from '../components/api/api';
import { UserContext } from '../context/UserContext';

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
      <div className='container'>
        <h1 className='text-font-bold'>
          Hi, {user.first_name ? user.first_name : user.username}!
        </h1>
        <h2>Details:</h2>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
