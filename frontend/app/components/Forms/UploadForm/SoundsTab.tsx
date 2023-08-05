import { useState } from 'react';
import SoundsInput from './SoundsInput';

const SoundsTab = () => {
  const [sounds, setSounds] = useState<Array<{ file: File, key: string, bpm: string, tags: string }>>([]);

  const handleSoundsChange = (value: any, index: number, field?: string) => {
    let newSounds = [...sounds];

    if (field) {
      newSounds[index] = { ...newSounds[index], [field]: value };
    } else {
      newSounds[index] = { ...newSounds[index], file: value.target.files[0] };
    }

    setSounds(newSounds);
  };

  return (
    <div>
      <div>
        
        <SoundsInput onChange={handleSoundsChange} />
      </div>
    </div>
  );
};

export default SoundsTab;
