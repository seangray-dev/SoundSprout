import { useState } from 'react';
import {
  Command,
  CommandDialog, CommandEmpty,
  CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut
} from '../../ui/command';
import { Input } from '../../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Textarea } from '../../ui/textarea';
import PackGenreCombobox from './PackGenreCombobox';

const PackTab = () => {
  const [packName, setPackName] = useState('');
  const [packDescription, setPackDescription] = useState('');
  const [packGenre, setPackGenre] = useState('');
  const [packImage, setPackImage] = useState(null);
  const [packPreview, setPackPreview] = useState(null);

  const handlePackNameChange = (e: any) => {
    setPackName(e.target.value);
  };

  const handlePackDescriptionChange = (e: any) => {
    setPackDescription(e.target.value);
  };

  return (
    <Tabs defaultValue="pack">
      <TabsContent value="pack">
        <div className="mb-4">
          <label htmlFor="pack-name" className="block text-sm font-medium text-gray-700">
            Pack Name
          </label>
          <Input 
            id="pack-name"
            name="packName"
            type="text"
            value={packName}
            onChange={handlePackNameChange}
            className="mt-1 block w-full"
            placeholder="Enter Pack Name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="pack-description" className="block text-sm font-medium text-gray-700">
            Pack Description
          </label>
          <Textarea
            id="pack-description"
            name="packDescription"
            value={packDescription}
            onChange={handlePackDescriptionChange}
            className="mt-1 block w-full"
            placeholder="Enter Pack Description"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="pack-description" className="block text-sm font-medium text-gray-700">
            Pack Genre
          </label>
          <PackGenreCombobox
          
          />        
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default PackTab;
