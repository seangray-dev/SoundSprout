'use client';

import { RootState } from '@/redux/store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCoverArtUrl } from '../api/cloudinary';
import Heading from '../components/Utils/Heading';
import PaymentInfoForm from './PaymentInfoForm';
import Summary from './Summary';
import { CartItem, columns } from './columns';
import { DataTable } from './data-table';

const Checkout = () => {
	const [clientSecret, setClientSecret] = useState('');
	const stripePromise = loadStripe(
		`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
	);
	const cartItems = useSelector((state: RootState) => state.cartReducer.items);
	const subtotal = cartItems.reduce(
		(total, item) => total + Number(item.price),
		0
	);
	const HST_RATE = 0.13;
	const hst = subtotal * HST_RATE;
	const total = subtotal + hst;

	useEffect(() => {
		axios
			.post(
				`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/create-payment-intent/`,
				{
					amount: total,
				}
			)
			.then((res) => {
				console.log(res.data.clientSecret);
				setClientSecret(res.data.clientSecret);
			})
			.catch((err) => {
				console.error('Checkout: Error fetching client secret', err);
			});
	}, []);

	return (
		<section className='container my-6'>
			<Heading level={1} className='text-3xl mb-6'>
				Checkout
			</Heading>
			{cartItems.length === 0 ? (
				<p>Your cart is empty!</p>
			) : (
				<>
					{clientSecret && (
						<Elements stripe={stripePromise} options={{ clientSecret }}>
							<DataTable columns={columns} data={cartItems} />
							<div className='grid grid-cols-2 gap-6'>
								<PaymentInfoForm />
								<Summary subtotal={subtotal} hst={hst} total={total} />
							</div>
						</Elements>
					)}
				</>
			)}
		</section>
	);
};

export default Checkout;
