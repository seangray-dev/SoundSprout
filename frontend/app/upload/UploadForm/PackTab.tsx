import { updatePackData } from '@/redux/features/upload-pack';
import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import GenreCombobox from './GenreCombobox';
import handleFileChange from './UploadForm';

const PackTab = () => {
	const dispatch = useDispatch();
	const packData = useSelector(
		(state: RootState) => state.uploadReducer.packData
	);
	const [selectedGenre, setSelectedGenre] = useState(
		packData.genre
	);
	const [fileInputs, setFileInputs] = useState<{
		packImage?: File;
		packPreview?: File;
	}>({});
	const [packPrice, setPackPrice] = useState<number | string>('');

	const handlePackDataChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		const updatedPackData = { ...packData, [name]: value };
		if (name === 'packImage' || name === 'packPreview') {
			const file = (e.target as HTMLInputElement).files?.[0];
			if (file) {
				updatedPackData[name] = file;
			}
		}
		dispatch(updatePackData(updatedPackData));
	};

	const handleGenreChange = (newGenre: string) => {
		setSelectedGenre(newGenre);
		const updatedPackData = { ...packData, selectedGenre: newGenre };
		dispatch(updatePackData(updatedPackData));
	};

	return (
		<div className='flex flex-col justify-center items-center mt-8'>
			<div className='grid grid-cols-2 gap-10 bg-gray-100 p-10 rounded-md'>
				<div className='mb-4'>
					<label htmlFor='pack-name'>Name</label>
					<Input
						id='pack-name'
						name='packName'
						type='text'
						className='mt-1 block w-full'
						placeholder='Enter Pack Name'
					/>
				</div>

				<div className='mb-4'>
					<label htmlFor='pack-description'>Description</label>
					<Textarea
						id='pack-description'
						name='packDescription'
						className='mt-1 block w-full bg-white'
						placeholder='Enter Pack Description'
					/>
				</div>

				<div className='mb-4'>
					<label htmlFor='pack-description' className='block'>
						Genre
					</label>
					<GenreCombobox
						selectedGenre={selectedGenre}
						onSelectGenre={handleGenreChange}
					/>
				</div>

				<div className='mb-4'>
					<label htmlFor='pack-image'>Pack Cover Art</label>
					<Input id='pack-image' type='file' accept='image/*' />
					{packData.packImage && (
						<p className='text-sm mt-1'>{(packData.packImage as File).name}</p>
					)}
				</div>

				<div className='mb-4'>
					<label htmlFor='pack-preview'>Pack Preview</label>
					<Input id='pack-preview' type='file' accept='audio/*' />
					{packData.packPreview && (
						<p className='text-sm mt-1'>
							{(packData.packPreview as File).name}
						</p>
					)}
				</div>
				<div className='mb-4'>
					<label htmlFor='pack-price'>Price ($)</label>
					<Input
						id='pack-price'
						name='packPrice'
						type='number'
						step='0.01'
						min='0'
						max='99.99'
						className='mt-1 block w-full'
						placeholder='Enter Pack Price'
					/>
				</div>
			</div>
		</div>
	);
};

export default PackTab;
