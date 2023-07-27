import { setSortField, toggleSortOrder } from '@/redux/features/sortSounds';
import { RootState } from '@/redux/store';
import { ChevronUpDownIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PackSoundsHeader = () => {
	const dispatch = useDispatch();
	const { field, order } = useSelector((state: RootState) => state.sortSounds);

	const handleSort = (selectedField: 'name' | 'duration' | 'key' | 'bpm') => {
		if (selectedField !== field) {
			dispatch(setSortField(selectedField));
		} else {
			dispatch(toggleSortOrder());
		}
	};

	return (
		<header className='border-t border-b text-sm text-gray-500 grid grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 py-2'>
			<div className='ml-10'>Pack</div>
			<div>
				<button
					className='flex items-center ml-10 md:ml-0'
					onClick={() => handleSort('name')}>
					Filename <ChevronUpDownIcon className='w-4 h-4' />
				</button>
			</div>
			<div>
				<button
					className='flex items-center'
					onClick={() => handleSort('duration')}>
					Time <ChevronUpDownIcon className='w-4 h-4' />
				</button>
			</div>
			<div>
				<button className='flex items-center' onClick={() => handleSort('key')}>
					Key <ChevronUpDownIcon className='w-4 h-4' />
				</button>
			</div>
			<div>
				<button
					className='flex items-center -ml-3'
					onClick={() => handleSort('bpm')}>
					BPM <ChevronUpDownIcon className='w-4 h-4' />
				</button>
			</div>
		</header>
	);
};

export default PackSoundsHeader;
