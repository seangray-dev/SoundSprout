import { useState } from 'react';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import BPMCombobox from './BPMCombobox';
import KeyCombobox from './KeyCombobox';
import SoundsInput from './SoundsInput';

const SoundsTab = () => {
  const [sounds, setSounds] = useState<File[]>([]);
  const [key, setKey] = useState('');
  const [bpm, setBpm] = useState('');
  const [tags, setTags] = useState('');

  const handleSoundsChange = (e: any) => {
    setSounds([...sounds, e.target.files[0]]);
  };

  const handleKeyChange = (selectedKey: any) => {
    setKey(selectedKey);
  };

  const handleBPMChange = (selectedBpm: any) => {
    setBpm(selectedBpm);
  };

  const handleTagsChange = (e: any) => {
    setTags(e.target.value);
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="pack-sounds">
          Pack Sounds
        </label>
        <SoundsInput onChange={handleSoundsChange} />
      </div>

      <div className="mb-4">
        <label htmlFor="pack-key" className="block">
          Key
        </label>
        <KeyCombobox onChange={handleKeyChange} />
      </div>

      <div className="mb-4">
        <label htmlFor="pack-bpm" className="block">
          BPM
        </label>
        <BPMCombobox onChange={handleBPMChange} />
      </div>

      <div className="mb-4">
        <label htmlFor="pack-tags">
          Tags
        </label>
        <Textarea
          id="pack-tags"
          value={tags}
          onChange={handleTagsChange}
          className="mt-1 block w-full"
          placeholder="Enter tags (separate by commas)"
        />
      </div>
    </div>
  );
};

export default SoundsTab;
