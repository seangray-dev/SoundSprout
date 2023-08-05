import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import PackTab from './PackTab';
import SoundsTab from './SoundsTab';

const UploadForm = () => {
  return (
    <div className="p-8">
      <Tabs defaultValue="pack" className="flex flex-col justify-center items-center">
        <TabsList>
          <TabsTrigger value="pack">Pack</TabsTrigger>
          <TabsTrigger value="sounds">Sounds</TabsTrigger>
        </TabsList>
        <TabsContent value="pack">
          <PackTab />
        </TabsContent>
        <TabsContent value="sounds">
          <SoundsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UploadForm;
