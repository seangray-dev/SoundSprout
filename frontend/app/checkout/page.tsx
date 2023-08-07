'use client';

import { RootState } from '@/redux/store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Heading from '../components/Utils/Heading';
import PaymentInfoForm from './PaymentInfoForm';
import Summary from './Summary';
import { columns } from './columns';
import { DataTable } from './data-table';

const Checkout = () => {
	const [clientSecret, setClientSecret] = useState('');
	const stripePromise = loadStripe(
		`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
	);
	const cartItems = useSelector((state: RootState) => state.cartReducer.items);

	const sounds = cartItems
		.filter((item) => item.type === 'sound')
		.map((item) => item.item);
	const packs = cartItems
		.filter((item) => item.type === 'pack')
		.map((item) => item.item);

	console.log('Sounds', sounds);
	console.log('Packs', packs);

	const soundPublicIds = sounds.map((sound) => sound.audio_file);

	const subtotal = cartItems.reduce((total, cartItem) => {
		return total + Number(cartItem.item.price);
	}, 0);

	const HST_RATE = 0.13;
	const hst = subtotal * HST_RATE;
	const total = Number((subtotal + hst).toFixed(2));

	useEffect(() => {
		axios
			.post(
				`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/create-payment-intent/`,
				{
					amount: total,
				}
			)
			.then((res) => {
				setClientSecret(res.data.clientSecret);
			})
			.catch((err) => {
				console.error('Checkout: Error fetching client secret', err);
			});
	}, [total, cartItems]);

	useEffect(() => {
		if (soundPublicIds.length > 0) {
			axios
				.post(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/download-files/`, {
					soundPublicIds,
				})
				.then((res) => {
					console.log(
						'setting download links to local storage',
						res.data.downloadLinks
					);
					localStorage.setItem(
						'downloadLinks',
						JSON.stringify(res.data.downloadLinks)
					);
				});
		}
		if (packs.length > 0) {
			console.log('packs use effect', packs);
			const packIds = packs.map((pack) => pack.id);
			console.log('PackIds', packIds);
			axios
				.post(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/download-packs/`, {
					packIds,
				})
				.then((res) => {
					console.log('Zip file name:', res.data.zipFileName);
					// Store the name of the zip file into local storage
					localStorage.setItem('zipFileName', res.data.zipFileName);
				});
		}
	}, [soundPublicIds, packs]);

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
