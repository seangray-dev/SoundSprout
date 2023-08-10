import { PlusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Alert, AlertTitle } from '../../components/ui/alert';
import { Button, buttonVariants } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import BPMCombobox from './BPMCombobox';
import KeyCombobox from './KeyCombobox';

const SoundsInput = ({ onChange }: any) => {
	const [inputList, setInputList] = useState(
		Array.from({ length: 6 }, (_, i) => i)
	);
	const [showAlert, setShowAlert] = useState(false);

	const handleAddClick = () => {
		if (inputList.length < 10) {
			setInputList([...inputList, inputList.length]);
		} else {
			setShowAlert(true);
		}
	};

	return (
		<div className='grid grid-cols-2 gap-4 mt-8'>
			{inputList.map((_, index) => (
				<div
					key={index}
					className='flex flex-wrap gap-2 p-4 rounded bg-gray-100'>
					<label>Sound {index + 1}</label>
					<Input
						type='file'
						accept='audio/*'
						onChange={(e) => onChange(e, index)}
						className='mb-1'
					/>
					<KeyCombobox
						onChange={(selectedKey) => onChange(selectedKey, index, 'key')}
					/>
					<BPMCombobox
						onChange={(selectedBpm) => onChange(selectedBpm, index, 'bpm')}
					/>
					<Textarea
						id={`tags-${index}`}
						rows={2}
						onChange={(e) => onChange(e.target.value, index, 'tags')}
						className='mt-1 block w-full h-[40px] bg-white'
						placeholder='Enter tags (separate by commas)'
					/>
				</div>
			))}
			{!showAlert && (
				<Button
					variant='ghost'
					onClick={handleAddClick}
					className='flex gap-2 items-center mt-2 col-span-2 border border-gray-100 hover:bg-gray-100 transition-all duration-300'>
					<span>Add More ({inputList.length}/10)</span>
					<PlusIcon className='w-4 h-4' />
				</Button>
			)}
			{showAlert && (
				<Alert
					className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
					role='alert'>
					<AlertTitle>
						You have reached the maximum limit of 10 sound files.
					</AlertTitle>
				</Alert>
			)}
		</div>
	);
};

export default SoundsInput;
