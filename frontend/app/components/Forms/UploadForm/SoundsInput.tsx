import { useState } from 'react';
import { Alert, AlertTitle } from '../../ui/alert';
import { Button, buttonVariants } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import BPMCombobox from './BPMCombobox';
import KeyCombobox from './KeyCombobox';

const SoundsInput = ({ onChange }: any) => {
  const [inputList, setInputList] = useState(Array.from({length: 5}, (_, i) => i));
  const [showAlert, setShowAlert] = useState(false);

  const handleAddClick = () => {
    if (inputList.length < 10) {
      setInputList([...inputList, inputList.length]);
    } else {
      setShowAlert(true);
    }
  };

  return (
    <div>
      <ul>
      {inputList.map((_, index) => (
        <li 
          key={index} 
          className={`p-4 rounded ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
        >
          <label>Sound {index + 1}</label>
          <Input
            type="file"
            accept="audio/*"
            onChange={e => onChange(e, index)}
            className="mb-1"
          />
          <KeyCombobox onChange={selectedKey => onChange(selectedKey, index, 'key')} />
          <BPMCombobox onChange={selectedBpm => onChange(selectedBpm, index, 'bpm')} />
          <Textarea
            id={`tags-${index}`}
            rows={2} 
            onChange={e => onChange(e.target.value, index, 'tags')}
            className="mt-1 block w-full h-[40px] bg-white"
            placeholder="Enter tags (separate by commas)"
          />
        </li>
      ))}
      {!showAlert && <Button 
          variant="ghost" 
          onClick={handleAddClick}
          className="mt-2"
        >
          Add More ({inputList.length}/10)
        </Button>}
      {showAlert && (
        <Alert className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <AlertTitle>You have reached the maximum limit of 10 sound files.</AlertTitle>
        </Alert>
      )}
      </ul>
    </div>
  );
};

export default SoundsInput;
