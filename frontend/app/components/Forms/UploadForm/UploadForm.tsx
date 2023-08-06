import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import PackTab from './PackTab';
import SoundsTab from './SoundsTab';


const UploadForm = () => {
  const [packData, setPackData] = useState({
    packName: '',
    packDescription: '',
    packGenre: '',
    packImage: null,
    packPreview: null
  });

  const handlePackDataChange = (key: string, value: any) => {
    setPackData(prevState => ({ ...prevState, [key]: value }));
  };

  return (
    <div className="p-4">
      <Tabs defaultValue="pack" className="flex flex-col justify-center items-center">
        <TabsList>
          <TabsTrigger value="pack" style={{ fontSize: '1em', width: '104px' }}>Pack</TabsTrigger>
          <TabsTrigger value="sounds" style={{ fontSize: '1em', width: '104px' }}>Sounds</TabsTrigger>
        </TabsList>
        <TabsContent value="pack">
          <PackTab packData={packData} handlePackDataChange={handlePackDataChange} />
        </TabsContent>
        <TabsContent value="sounds">
          <SoundsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};


export default UploadForm;
