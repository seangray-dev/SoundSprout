'use client';

import { useState } from 'react';
import { handlePackUpload } from '../api/api';

const UploadPackForm = () => {
	const [formData, setFormData] = useState({
		packName: '',
		genre: '',
		description: '',
		packImage: null,
		packPreview: null,
		price: '',
		sounds: [
			{
				soundFile: null,
				key: '',
				bpm: '',
				tags: '',
				price: '',
			},
		],
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (e.target.type === 'file') {
			setFormData({ ...formData, [name]: e.target.files[0] });
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleSoundChange = (e, index) => {
		const { name, value } = e.target;
		const updatedSounds = [...formData.sounds];
		const updatedSound = {
			...updatedSounds[index],
			[name]: e.target.type === 'file' ? e.target.files[0] : value,
		};

		updatedSounds[index] = updatedSound;
		setFormData({ ...formData, sounds: updatedSounds });
	};

	const addSound = () => {
		setFormData({
			...formData,
			sounds: [
				...formData.sounds,
				{ soundFile: null, key: '', bpm: '', tags: '', price: '' },
			],
		});
	};

	return (
		<div className='container my-10'>
			<form className='grid grid-cols-2 gap-2' onSubmit={handlePackUpload}>
				<div className='flex flex-col border'>
					<label htmlFor='packName'>Name:</label>
					<input
						type='text'
						id='packName'
						name='packName'
						onChange={handleChange}
					/>
				</div>
				<div className='flex flex-col border'>
					<label htmlFor='genre'>Genre:</label>
					<select id='genre' name='genre' onChange={handleChange}>
						<option value=''></option>
						<option value='1'>Hip Hop / R&B</option>
						<option value='2'>Pop/EDM</option>
						<option value='3'>Bass Music</option>
						<option value='4'>Global</option>
						<option value='5'>House/Techno</option>
						<option value='6'>Live Sounds</option>
						<option value='7'>Electronic</option>
						<option value='8'>Cinematic</option>
					</select>
				</div>
				<div className='flex flex-col border'>
					<label htmlFor='description'>Description:</label>
					<textarea
						id='description'
						name='description'
						onChange={handleChange}
					/>
				</div>
				<div className='flex flex-col border'>
					<label htmlFor='packImage'>Pack Cover Art:</label>
					<input
						type='file'
						id='packImage'
						name='packImage'
						accept='image/*'
						onChange={handleChange}
					/>
				</div>
				<div className='flex flex-col border'>
					<label htmlFor='packPreview'>Pack Preview:</label>
					<input
						type='file'
						id='packPreview'
						name='packPreview'
						accept='audio/*'
						onChange={handleChange}
					/>
				</div>
				<div className='flex flex-col border'>
					<label htmlFor='price'>Price:</label>
					<input
						type='number'
						id='price'
						name='price'
						onChange={handleChange}
					/>
				</div>
				<h2>Sounds</h2>
				<div className='col-span-2'>
					<div className='h-1 bg-gray-100'></div>
				</div>
				{formData.sounds.map((sound, index) => (
					<>
						<div className='flex flex-col border col-span-2'>
							<label htmlFor={`soundFile-${index}`}>Sound File:</label>
							<input
								type='file'
								id={`soundFile-${index}`}
								name='soundFile'
								accept='audio/*'
								onChange={(e) => handleSoundChange(e, index)}
							/>
						</div>
						<div className='flex flex-col border'>
							<label htmlFor='key'>Key:</label>
							<input type='text' id='key' name='key' onChange={handleChange} />
						</div>
						<div className='flex flex-col border'>
							<label htmlFor='bpm'>BPM:</label>
							<input
								type='number'
								id='bpm'
								name='bpm'
								onChange={handleChange}
							/>
						</div>
						<div className='flex flex-col border'>
							<label htmlFor='tags'>Tags:</label>
							<input
								type='text'
								id='tags'
								name='tags'
								onChange={handleChange}
							/>
						</div>
						<div className='flex flex-col border'>
							<label htmlFor='price'>Price:</label>
							<input
								type='number'
								id='price'
								name='price'
								step='0.01'
								onChange={handleChange}
							/>
						</div>
					</>
				))}
				<button className='border col-span-2' type='button' onClick={addSound}>
					Add another sound +
				</button>
				<button
					className='col-span-2 bg-purple text-white font-bold py-2 px-4'
					type='submit'>
					Upload
				</button>
			</form>
		</div>
	);
};

export default UploadPackForm;
