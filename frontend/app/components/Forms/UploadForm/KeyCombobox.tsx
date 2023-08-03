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

interface KeyComboboxProps {
  onChange: (selectedKey: string) => void;
}

const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const KeyCombobox: React.FC<KeyComboboxProps> = ({ onChange }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue;
    setValue(newValue);
    onChange(newValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value || "Select Key..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search key..." />
          <CommandEmpty>No key found.</CommandEmpty>
          <CommandGroup>
            {keys.map((key) => (
              <CommandItem
                key={key}
                onSelect={() => handleSelect(key)}
              >
                <Check
                  className={value === key ? "mr-2 h-4 w-4 opacity-100" : "mr-2 h-4 w-4 opacity-0"}
                />
                {key}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default KeyCombobox;
