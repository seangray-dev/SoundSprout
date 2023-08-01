'use client';

import { removeFromCart } from '@/redux/features/cartSlice';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { getCoverArtUrl } from '../api/cloudinary';
import { Button } from '../components/ui/button';

export type CartItem = {
	id: number;
	name: string;
	price: number;
	pack: {
		cover_art_location: string;
	};
};

export const columns: ColumnDef<
	CartItem & { pack: { cover_art_location: string } }
>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => (
			<div className='flex gap-4 items-center'>
				<Image
					alt={row.original.name}
					width={50}
					height={50}
					src={getCoverArtUrl(row.original.pack.cover_art_location)}
				/>
				<div className='truncate'>{row.original.name}</div>
			</div>
		),
	},
	{
		accessorKey: 'price',
		header: 'Price',
		cell: ({ row }) => {
			const dispatch = useDispatch();

			return (
				<div className='flex items-center justify-between'>
					<div>${row.original.price}</div>
					<Button
						asChild
						title='Remove Item'
						variant='ghost'
						onClick={() => {
							dispatch(removeFromCart(Number(row.original.id)));
						}}
						className='text-red-600 hover:text-red-800 hover:cursor-pointer transition-all duration-300'>
						<XCircleIcon className='h-6 w-6'></XCircleIcon>
					</Button>
				</div>
			);
		},
	},
];
