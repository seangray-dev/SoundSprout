import { getCoverArtUrl } from '@/app/api/cloudinary';
import { removeFromCart } from '@/redux/features/cartSlice';
import { RootState } from '@/redux/store';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { link } from 'fs';
import Image from 'next/image';
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
				<ul className='flex flex-col gap-4'>
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
			)}
		</div>
	);
};

export default CartPopover;
