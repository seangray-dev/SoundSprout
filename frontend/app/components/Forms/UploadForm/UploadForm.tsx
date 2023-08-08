import { useState } from 'react';
import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import PackTab from './PackTab';
import SoundsTab from './SoundsTab';

const UploadForm = () => {
  const [activeTab, setActiveTab] = useState('pack');
  const [packData, setPackData] = useState({
    packName: '',
    packDescription: '',
    packGenre: '',
    packImage: null,
    packPreview: null,
    packPrice: 0
  });
  const [showDialog, setShowDialog] = useState(false);
  const [soundData, setSoundData] = useState<Array<{ file: File, name: string, key: string, bpm: string, tags: string, price: number }>>([]);



  const handlePackDataChange = (key: string, value: any) => {
    setPackData(prevState => ({ ...prevState, [key]: value }));
  };

  const handleSoundDataUpdate = (updatedSounds: any) => {
    setSoundData(updatedSounds);
  };

  const handleFileChange = (key: string, file: File) => {
    setPackData(prevState => ({ ...prevState, [key]: file }));
  };

  const handleSubmit = async () => {
    console.log("Form submitted with data:", packData);
  
    try {
      const responsePack = await fetch('/api/pack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: packData.packName,
          description: packData.packDescription,
          price: packData.packPrice, 
          cover_art_location: packData.packImage,
          preview: packData.packPreview
        })
      });
  
      if (!responsePack.ok) throw new Error("Error storing pack information.");
  
      const packResult = await responsePack.json();
      const packId = packResult.id;
  
      for (let sound of soundData) {
        const responseSound = await fetch('/api/sound', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: sound.name,
                audio_file: sound.file,
                bpm: sound.bpm,
                key: sound.key,
                price: sound.price,
                pack: packId
            })
        });
  
        if (!responseSound.ok) throw new Error("Error storing sound information.");
  
        const soundResult = await responseSound.json();
        const soundId = soundResult.id;
  
        for (let tag of sound.tags) {
          await fetch('/api/soundtagassociation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              sound: soundId,
              tag: tag
            })
          });
        }
      }
  
      await fetch('/api/packgenreassociation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pack: packId,
          genre: packData.packGenre
        })
      });
  
      window.location.href = "/success"; 
  
    } catch (error) {
      console.error('Unexpected error:', error);
    }
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
            <SoundsTab onSoundsUpdate={handleSoundDataUpdate} />
          </TabsContent>
      </Tabs>
      <div className="mt-4">
        <Dialog>
          <DialogTrigger className="w-full">
            <Button 
              variant="default"
              className="bg-purple w-full font-bold"
              type="button"
              onClick={() => setShowDialog(true)}
            >
              Submit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit?
            </DialogDescription>
            <button onClick={() => { handleSubmit(); setShowDialog(false); }}>Yes, Submit</button>
            <button onClick={() => setShowDialog(false)}>Cancel</button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UploadForm;
