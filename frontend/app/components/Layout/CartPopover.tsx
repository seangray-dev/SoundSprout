import { getCoverArtUrl } from '@/app/api/cloudinary';
import { Pack, Sound } from '@/app/types';
import { removeFromCart } from '@/redux/features/cartSlice';
import { RootState } from '@/redux/store';
import { XCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../ui/button';

const CartPopover = ({ setIsOpen }: { setIsOpen: (open: boolean) => void }) => {
	const dispatch = useDispatch();
	const cartItems = useSelector((state: RootState) => state.cartReducer.items);

	const subtotal = cartItems.reduce((total, cartItem) => {
		return total + Number(cartItem.item.price);
	}, 0);

	const proceedToCheckout = () => {
		setIsOpen(false);
	};

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
						{cartItems.map((cartItem, index) => {
							const item = cartItem.item;
							let coverArtLocation: string | undefined;

							if (cartItem.type === 'pack') {
								coverArtLocation = (item as Pack).cover_art_location;
							} else {
								coverArtLocation = (item as Sound).pack?.cover_art_location;
							}

							return (
								<li
									className='flex flex-col gap-2 pb-2 border-b border-b-gray-2'
									key={index}>
									<Image
										src={getCoverArtUrl(
											coverArtLocation ||
												'/assets/images/default-audiofile.jpeg'
										)}
										width={40}
										height={40}
										alt={item.name}
									/>
									<div className='flex items-center justify-between'>
										<p className='text-sm truncate w-[300px]'>{item.name}</p>
										<div className='flex gap-4 items-center justify-between'>
											<p>${item.price}</p>
											<button
												onClick={() => handleRemoveFromCart(item.id)}
												title='Remove Item'>
												<XCircleIcon className='w-6 h-6 hover:cursor-pointer hover:text-red-500 transition-all duration-300' />
											</button>
										</div>
									</div>
								</li>
							);
						})}
					</ul>

					<div className='mb-4 flex justify-between items-center'>
						<span className='text-xl'>Subtotal</span>
						<span className='font-bold'>${subtotal}</span>
					</div>
					<div className='flex justify-center w-full'>
						<Button
							onClick={proceedToCheckout}
							className='w-full text-base bg-purple py-4 hover:bg-white hover:text-purple transition-all duration-300'>
							<Link href={'/checkout'}>Proceed To Checkout</Link>
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CartPopover;
