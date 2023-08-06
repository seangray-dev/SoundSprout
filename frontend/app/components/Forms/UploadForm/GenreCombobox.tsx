import { Check, ChevronsUpDown } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../../ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../ui/popover';

const genres = [
  {
    value: "hip-hop-rnb",
    label: "Hip Hop / R&B",
  },
  {
    value: "pop-edm",
    label: "Pop/EDM",
  },
  {
    value: "bass-music",
    label: "Bass Music",
  },
  {
    value: "global",
    label: "Global",
  },
  {
    value: "house-techno",
    label: "House/Techno",
  },
  {
    value: "live-sounds",
    label: "Live Sounds",
  },
  {
    value: "electronic",
    label: "Electronic",
  },
  {
    value: "cinematic",
    label: "Cinematic",
  }
];

const GenreCombobox = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? genres.find((genre) => genre.value === value)?.label
            : "Select Genre..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search genre..." />
          <CommandEmpty>No genre found.</CommandEmpty>
          <CommandGroup>
            {genres.map((genre) => (
              <CommandItem
              key={genre.value}
              onSelect={() => {
                  setValue(value === genre.value ? "" : genre.value);
                  setOpen(false);
              }}
          >
              <Check
                  className={value === genre.value ? "mr-2 h-4 w-4 opacity-100" : "mr-2 h-4 w-4 opacity-0"}
              />
              {genre.label}
          </CommandItem>
          
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default GenreCombobox;
