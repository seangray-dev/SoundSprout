import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import PackTab from './PackTab';
//import SoundsTab from './SoundsTab';

const UploadForm = () => {
  return (
    <Tabs defaultValue="pack" className="w-full">
      <TabsList>
        <TabsTrigger value="pack">Pack</TabsTrigger>
        <TabsTrigger value="sounds">Sounds</TabsTrigger>
      </TabsList>
      <TabsContent value="pack">
        <PackTab />
      </TabsContent>
      <TabsContent value="sounds">
        {/* Insert SoundsTab Component here */}
      </TabsContent>
    </Tabs>
  );
};

export default UploadForm;
