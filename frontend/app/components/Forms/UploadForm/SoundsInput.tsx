import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';
import { Input } from '../../ui/input';

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
      {inputList.map((_, index) => (
        <Input
          key={index}
          type="file"
          accept="audio/*"
          onChange={onChange}
          style={{
            backgroundColor: index % 2 === 0 ? 'white' : '#f3f3f3',
          }}
        />
      ))}
      {!showAlert && <button onClick={handleAddClick}>Add More</button>}
      {showAlert && (
      <Alert className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <AlertTitle>You have reached the maximum limit of 10 sound files.</AlertTitle>
      </Alert>
      )}
    </div>
  );
};

export default SoundsInput;
