'use client';

import axios from 'axios';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/app/hooks/context/UserContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Btn_Primary from '../Buttons/Btn_Primary';

const validationSchema = Yup.object({
  userIdentifier: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const initialValues = {
  userIdentifier: '',
  password: '',
};

const LoginForm = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (
    values,
    { setSubmitting, setStatus, setFieldError }
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/login/`,
        values
      );

      console.log('response', response);

      const data = response.data;

      if (response.status === 200) {
        // Login successful
        localStorage.setItem('token', data.access_token);
        setUser(data.user.username);
        router.push('/profile');
      } else {
        setStatus(data.error);
        throw new Error('Unable to login');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ status }) => (
        <Form className='mt-6 flex flex-col gap-8 mx-auto'>
          <div className='relative'>
            <label htmlFor='userIdentifier' className='hidden'>
              Username or Email
            </label>
            <UserIcon className='text-gray-2 w-5 absolute top-2.5 left-4' />
            <Field
              type='text'
              id='userIdentifier'
              name='userIdentifier'
              placeholder='Username or Email'
              className='input-field rounded-full py-2 pl-12 w-full'
            />
            <ErrorMessage
              name='userIdentifier'
              component='div'
              className='absolute -top-6 right-0 text-red-500 text-right pr-5'
            />
          </div>
          <div className='relative'>
            <label htmlFor='password' className='hidden'>
              Password
            </label>
            <LockClosedIcon className='text-gray-2 w-5 absolute top-2.5 left-4' />
            <Field
              type='password'
              id='password'
              name='password'
              placeholder='Password'
              className='input-field rounded-full py-2 pl-12 w-full'
            />
            <ErrorMessage
              name='password'
              component='div'
              className='absolute -top-6 right-0 text-red-500 text-right pr-5'
            />
          </div>
          <div className='relative'>
            <Btn_Primary type='submit'>Login</Btn_Primary>
            {status && (
              <div className='text-red-500 text-sm text-center absolute inset-x-0 -top-6'>
                {status}
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
