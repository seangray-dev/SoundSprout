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

  const handlePackImageChange = (e: any) => {
    setPackImage(e.target.files[0]);
  };

  const handlePackPreviewChange = (e: any) => {
    setPackPreview(e.target.files[0]);
  };

  return (
    <Tabs defaultValue="pack">
      <TabsContent value="pack">
        <div className="flex flex-col justify-center items-center">
          <div className= "w-[400px]">
            <div className="mb-4" >
              <label htmlFor="pack-name">
                Name
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
              <label htmlFor="pack-description">
                Description
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
              <label htmlFor="pack-description" className="block">
                Genre
              </label>
              <PackGenreCombobox
              
              />        
            </div>

            <div className="mb-4">
              <label htmlFor="pack-image">
                Pack Image
              </label>
              <Input
                id="pack-image"
                type="file"
                accept="image/*"
                onChange={handlePackImageChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="pack-preview">
                Pack Preview
              </label>
              <Input
                id="pack-preview"
                type="file"
                accept="audio/*"
                onChange={handlePackPreviewChange}
              />
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default PackTab;
