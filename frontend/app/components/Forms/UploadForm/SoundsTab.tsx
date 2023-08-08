import { useEffect, useState } from 'react';
import SoundsInput from './SoundsInput';

const SoundsTab = ({ onSoundsUpdate }: any) => {
  const [sounds, setSounds] = useState<Array<{ file: File, name: string, key: string, bpm: string, tags: string, price: number }>>([]);
  console.log("SoundsTab Rendered");

const handleSoundsChange = (value: any, index: number, field?: string) => {
    let newSounds = [...sounds];

    if (field) {
      newSounds[index] = { ...newSounds[index], [field]: value };
    } else {
      newSounds[index] = { 
        ...newSounds[index], 
        file: value.target.files[0],
        name: value.target.files[0].name,
        price: 0.99  
      };
    }

    setSounds(newSounds);
  };

  useEffect(() => {
    onSoundsUpdate(sounds);
  }, [sounds, onSoundsUpdate]);

  return (
    <div>
      <div>
        <SoundsInput onChange={handleSoundsChange} />
      </div>
    </div>
  );
};

export default SoundsTab;
