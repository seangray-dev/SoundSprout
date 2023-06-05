'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  UserIcon,
  LockClosedIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import Btn_Primary from '../Buttons/Btn_Primary';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const initialValues = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignupForm = () => {
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await fetch('http://localhost:8000/create-user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // User creation successful
          console.log('User created successfully');
        } else {
          // User creation failed
          setFieldError('username', data.error);
        }
      } else {
        throw new Error('Unable to create user');
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
      <Form className='mt-6 flex flex-col gap-8 mx-auto'>
        <div className='relative'>
          <label htmlFor='username' className='hidden'>
            Username
          </label>
          <UserIcon className='text-gray-2 w-5 absolute top-2.5 left-4' />
          <Field
            type='text'
            id='username'
            name='username'
            placeholder='Username'
            className='input-field rounded-full py-2 pl-12 w-full'
          />
          <ErrorMessage
            name='username'
            component='div'
            className='absolute -top-6 right-0 text-red-500 text-right pr-5'
          />
        </div>
        <div className='relative'>
          <label htmlFor='firstName' className='hidden'>
            First Name
          </label>
          <UserIcon className='text-gray-2 w-5 absolute top-2.5 left-4' />
          <Field
            type='text'
            id='firstName'
            name='firstName'
            placeholder='First Name'
            className='input-field rounded-full py-2 pl-12 w-full'
          />

          <ErrorMessage
            name='firstName'
            component='div'
            className='absolute -top-6 right-0 text-red-500 text-right pr-5'
          />
        </div>
        <div className='relative'>
          <label htmlFor='lastName' className='hidden'>
            Last Name
          </label>
          <UserIcon className='text-gray-2 w-5 absolute top-2.5 left-4' />
          <Field
            type='text'
            id='lastName'
            name='lastName'
            placeholder='Last Name'
            className='input-field rounded-full py-2 pl-12 w-full'
          />
          <ErrorMessage
            name='lastName'
            component='div'
            className='absolute -top-6 right-0 text-red-500 text-right pr-5'
          />
        </div>
        <div className='relative'>
          <label htmlFor='email' className='hidden'>
            Email
          </label>
          <EnvelopeIcon className='text-gray-2 w-5 absolute top-2.5 left-4' />
          <Field
            type='email'
            id='email'
            name='email'
            placeholder='Email'
            className='input-field rounded-full py-2 pl-12 w-full'
          />
          <ErrorMessage
            name='email'
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
          <label htmlFor='confirmPassword' className='hidden'>
            Confirm Password
          </label>
          <LockClosedIcon className='text-gray-2 w-5 absolute top-2.5 left-4' />
          <Field
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            placeholder='Confirm Password'
            className='input-field rounded-full py-2 pl-12 w-full'
          />
          <ErrorMessage
            name='confirmPassword'
            component='div'
            className='absolute -top-6 right-0 text-red-500 text-right pr-5'
          />
        </div>
        <Btn_Primary>Sign Up</Btn_Primary>
      </Form>
    </Formik>
  );
};

export default SignupForm;
