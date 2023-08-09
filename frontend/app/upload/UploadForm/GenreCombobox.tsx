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

type Genre = {
	value: string;
	label: string;
};

const genres: Genre[] = [
	{
		value: 'hip-hop-rnb',
		label: 'Hip Hop / R&B',
	},
	{
		value: 'pop-edm',
		label: 'Pop/EDM',
	},
	{
		value: 'bass-music',
		label: 'Bass Music',
	},
	{
		value: 'global',
		label: 'Global',
	},
	{
		value: 'house-techno',
		label: 'House/Techno',
	},
	{
		value: 'live-sounds',
		label: 'Live Sounds',
	},
	{
		value: 'electronic',
		label: 'Electronic',
	},
	{
		value: 'cinematic',
		label: 'Cinematic',
	},
];

type GenreComboboxProps = {
	selectedGenre: string;
	setSelectedGenre: (genre: string) => void;
};

const GenreCombobox: React.FC<GenreComboboxProps> = ({
	selectedGenre,
	setSelectedGenre,
}) => {
	const [open, setOpen] = useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className='w-[200px] justify-between'>
					{selectedGenre
						? genres.find((genre) => genre.value === selectedGenre)?.label
						: 'Select Genre...'}
					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command>
					<CommandInput placeholder='Search genre...' />
					<CommandEmpty>No genre found.</CommandEmpty>
					<CommandGroup>
						{genres.map((genre) => (
							<CommandItem
								key={genre.value}
								onSelect={() => {
									setSelectedGenre(
										selectedGenre === genre.value ? '' : genre.value
									);
									setOpen(false);
								}}>
								<Check
									className={
										selectedGenre === genre.value
											? 'mr-2 h-4 w-4 opacity-100'
											: 'mr-2 h-4 w-4 opacity-0'
									}
								/>
								{genre.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default GenreCombobox;
