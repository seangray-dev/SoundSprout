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
import { ScrollArea } from '../../ui/scroll';

interface BPMComboboxProps {
  onChange: (selectedBpm: number) => void;
}

const bpmValues = Array.from({length: 201}, (_, i) => i); // 0 to 200

const BPMCombobox: React.FC<BPMComboboxProps> = ({ onChange }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleSelect = (currentValue: number) => {
    const newValue = currentValue === Number(value) ? "" : String(currentValue);
    setValue(newValue);
    onChange(currentValue);  // Call the passed onChange function
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
          {value || "Select BPM..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search BPM..." />
          <CommandEmpty>No BPM found.</CommandEmpty>
          <ScrollArea className="h-[200px] w-[200px] rounded-md border">
            <div className="p-4">
              <CommandGroup>
                {bpmValues.map((bpm) => (
                  <CommandItem
                    key={bpm}
                    onSelect={() => handleSelect(bpm)}
                  >
                    <Check
                      className={String(value) === String(bpm) ? "mr-2 h-4 w-4 opacity-100" : "mr-2 h-4 w-4 opacity-0"}
                    />
                    {bpm}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default BPMCombobox;
