'use client';

import { removeFromCart } from '@/redux/features/cartSlice';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { getCoverArtUrl } from '../api/cloudinary';
import { Button } from '../components/ui/button';

export type CartItem = {
	type: 'sound' | 'pack';
	item: {
		id: number;
		name: string;
		price: number;
		cover_art_location?: string;
		pack?: {
			cover_art_location: string;
		};
	};
};

export const columns: ColumnDef<CartItem>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => {
			const coverArtLocation =
				row.original.type === 'sound'
					? row.original.item.pack?.cover_art_location
					: row.original.item.cover_art_location;

			return (
				<div className='flex gap-4 items-center'>
					<Image
						alt={row.original.item.name}
						width={50}
						height={50}
						src={getCoverArtUrl(coverArtLocation || '')}
					/>
					<div className='truncate'>{row.original.item.name}</div>
				</div>
			);
		},
	},
	{
		accessorKey: 'price',
		header: 'Price',
		cell: ({ row }) => {
			const dispatch = useDispatch();

			return (
				<div className='flex items-center justify-between'>
					<div>${row.original.item.price}</div>
					<Button
						asChild
						title='Remove Item'
						variant='ghost'
						onClick={() => {
							dispatch(removeFromCart(Number(row.original.item.id)));
						}}
						className='text-red-600 hover:text-red-800 hover:cursor-pointer transition-all duration-300'>
						<XCircleIcon className='h-6 w-6'></XCircleIcon>
					</Button>
				</div>
			);
		},
	},
];
