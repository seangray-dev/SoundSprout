import { useEffect, useState } from 'react';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import GenreCombobox from './GenreCombobox';
import handleFileChange from './UploadForm';

const PackTab = ({ packData, handlePackDataChange  }: any) => {
  const [selectedGenre, setSelectedGenre] = useState(packData.selectedGenre || "");
  const [fileInputs, setFileInputs] = useState<{ packImage?: File, packPreview?: File }>({});
  const [packPrice, setPackPrice] = useState<number | string>("");

  const handlePackNameChange = (e: any) => {
    handlePackDataChange('packName', e.target.value);
  };

  const handlePackDescriptionChange = (e: any) => {
    handlePackDataChange('packDescription', e.target.value);
  };
  
  const handlePackImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      handlePackDataChange('packImage', file);
      setFileInputs(prev => ({ ...prev, packImage: file }));
    }
  };

  const handlePackPreviewChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      handlePackDataChange('packPreview', file);
      setFileInputs(prev => ({ ...prev, packImage: file }));
    }
  };

  const handlePackPriceChange = (e: any) => {
    const value = e.target.value;
    
    if (value && (parseFloat(value) > 99.99 || !/^\d+(\.\d{0,2})?$/.test(value))) {
      return; 
    }
    
    setPackPrice(value);
    handlePackDataChange('packPrice', value);
  };

  useEffect(() => {
    handlePackDataChange('selectedGenre', selectedGenre);
  }, [selectedGenre]);

  return (   
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
            <GenreCombobox selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre}/>           
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
          {packData.packImage && <p className="text-sm mt-1">{(packData.packImage as File).name}</p>}

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
          {packData.packPreview && <p className="text-sm mt-1">{(packData.packPreview as File).name}</p>}

      </div>
      <div className="mb-4">
        <label htmlFor="pack-price">
          Price ($)
        </label>
        <Input 
          id="pack-price"
          name="packPrice"
          type="number"
          step="0.01"
          min="0"
          max="99.99"
          value={packData.packPrice}
          onChange={handlePackPriceChange}
          className="mt-1 block w-full"
          placeholder="Enter Pack Price"
        />
      </div>

      </div>
    </div>
  );
};

export default PackTab;
