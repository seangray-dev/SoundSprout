'use client';

import { LoginFormValues } from '@/app/types';
import { login, logout } from '@/redux/features/auth-slice';
import { AppDispatch } from '@/redux/store';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import axios, { AxiosError } from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import Btn_Primary from '../components/Buttons/Btn_Primary';

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
	const dispatch = useDispatch<AppDispatch>();

	const handleSubmit = async (
		values: LoginFormValues,
		{
			setSubmitting,
			setStatus,
			setFieldError,
		}: {
			setSubmitting: (isSubmitting: boolean) => void;
			setStatus: (status: string) => void;
			setFieldError: (field: string, message: string) => void;
		}
	) => {
		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/login/`,
				values
			);

			const data = response.data;

			if (response.status === 200) {
				localStorage.setItem('token', data.access_token);
				dispatch(login(data.user));
				router.push('/profile');
			} else {
				throw new Error('Unable to login');
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error(error);
				setStatus(
					error.response?.data.error ||
						'Login failed, please check your credentials.'
				);
			} else {
				setStatus('Login failed, please check your credentials.');
			}
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
							className='input-field rounded-md py-2 pl-12 w-full'
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
							className='input-field rounded-md py-2 pl-12 w-full'
						/>
						<ErrorMessage
							name='password'
							component='div'
							className='absolute -top-6 right-0 text-red-500 text-right pr-5'
						/>
					</div>
					<div className='relative'>
						<Btn_Primary type='submit'>Login</Btn_Primary>
						<Link href={'/signup'}>
							<p className='text-white mt-4 text-center hover:text-purple transition-all duration-300'>
								Don't have an account? Click here to sign up
							</p>
						</Link>
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
