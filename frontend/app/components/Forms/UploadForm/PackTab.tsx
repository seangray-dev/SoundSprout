import { Input } from '../../ui/input';
import { Tabs, TabsContent } from '../../ui/tabs';
import { Textarea } from '../../ui/textarea';
import GenreCombobox from './GenreCombobox';

const PackTab = ({ packData, handlePackDataChange, fileInputs, handleFileInputChange }: any) => {
  const handlePackNameChange = (e: any) => {
    handlePackDataChange('packName', e.target.value);
  };

  const handlePackDescriptionChange = (e: any) => {
    handlePackDataChange('packDescription', e.target.value);
  };

  const handlePackImageChange = (e: any) => {
    handleFileInputChange('packImage', e.target.files[0]);
  };

  const handlePackPreviewChange = (e: any) => {
    handleFileInputChange('packPreview', e.target.files[0]);
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
                value={packData.packName}
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
                value={packData.packDescription}
                onChange={handlePackDescriptionChange}
                className="mt-1 block w-full"
                placeholder="Enter Pack Description"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="pack-description" className="block">
                Genre
              </label>
              <GenreCombobox/>        
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
