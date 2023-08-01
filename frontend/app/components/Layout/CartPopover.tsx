import { getCoverArtUrl } from '@/app/api/cloudinary';
import { removeFromCart } from '@/redux/features/cartSlice';
import { RootState } from '@/redux/store';
import { XCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../ui/button';

const CartPopover = () => {
	const dispatch = useDispatch();
	const cartItems = useSelector((state: RootState) => state.cartReducer.items);

	const handleRemoveFromCart = (id: number) => {
		dispatch(removeFromCart(id));
	};

	return (
		<div className='p-4 text-white'>
			<h2 className='mb-6 text-xl pb-2 border-b border-b-gray-2'>Your cart</h2>
			{cartItems.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<div>
					<ul className='flex flex-col gap-4 mb-6'>
						{cartItems.map((sound, index) => (
							<li
								className='flex flex-col gap-2 pb-2 border-b border-b-gray-2'
								key={index}>
								<Image
									src={getCoverArtUrl(sound.pack.cover_art_location)}
									width={40}
									height={40}
									alt={sound.pack.name}
								/>
								<div className='flex items-center justify-between'>
									<p className='text-sm truncate w-[300px]'>{sound.name}</p>
									<div className='flex gap-4 items-center justify-between'>
										<p>${sound.price}</p>
										<Button
											onClick={() => handleRemoveFromCart(sound.id)}
											title='Remove Item'
											asChild
											variant='ghost'>
											<XCircleIcon className='w-6 h-6 hover:cursor-pointer hover:text-red-500' />
										</Button>
									</div>
								</div>
							</li>
						))}
					</ul>
					<div className='flex justify-center w-full'>
						<Button className='w-full text-base bg-purple py-4 hover:bg-white hover:text-purple transition-all duration-300'>
							<Link href={'/checkout'}>Proceed To Checkout</Link>
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CartPopover;
