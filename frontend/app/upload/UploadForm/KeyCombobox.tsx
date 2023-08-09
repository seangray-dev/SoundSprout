import { Check, ChevronsUpDown } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '../../components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '../../components/ui/popover';
import { ScrollArea } from '../../components/ui/scroll';

interface KeyComboboxProps {
	onChange: (selectedKey: string) => void;
}

const keys = [
	'C maj',
	'C# maj',
	'D maj',
	'D# maj',
	'E maj',
	'F maj',
	'F# maj',
	'G maj',
	'G# maj',
	'A maj',
	'A# maj',
	'B maj',
	'C min',
	'C# min',
	'D min',
	'D# min',
	'E min',
	'F min',
	'F# min',
	'G min',
	'G# min',
	'A min',
	'A# min',
	'B min',
];

const KeyCombobox: React.FC<KeyComboboxProps> = ({ onChange }) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');

	const handleSelect = (currentValue: string) => {
		if (currentValue === 'None') {
			setValue('');
			onChange('');
		} else {
			const newValue = currentValue === value ? '' : currentValue;
			setValue(newValue);
			onChange(newValue);
		}
		setOpen(false);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className='w-[200px] justify-between'>
					{value || 'Select Key...'}
					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command>
					<CommandInput placeholder='Search key...' />
					<CommandEmpty>No key found.</CommandEmpty>
					<ScrollArea className='h-[200px] w-[200px] rounded-md border'>
						<div className='p-4'>
							<CommandGroup>
								<CommandItem onSelect={() => handleSelect('None')}>
									<Check
										className={
											value === ''
												? 'mr-2 h-4 w-4 opacity-100'
												: 'mr-2 h-4 w-4 opacity-0'
										}
									/>
									None
								</CommandItem>

								{keys.map((key) => (
									<CommandItem key={key} onSelect={() => handleSelect(key)}>
										<Check
											className={
												value === key
													? 'mr-2 h-4 w-4 opacity-100'
													: 'mr-2 h-4 w-4 opacity-0'
											}
										/>
										{key}
									</CommandItem>
								))}
							</CommandGroup>
						</div>
					</ScrollArea>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default KeyCombobox;
