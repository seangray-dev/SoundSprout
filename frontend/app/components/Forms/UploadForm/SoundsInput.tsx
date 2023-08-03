import { useState } from 'react';
import { Input } from '../../ui/input';

const SoundsInput = ({ onChange }: any) => {
  const [inputList, setInputList] = useState([0]);

  const handleAddClick = () => {
    setInputList([...inputList, inputList.length]);
  };

  return (
    <div>
      {inputList.map((_, index) => (
        <Input
          key={index}
          type="file"
          accept="audio/*"
          onChange={onChange}
        />
      ))}
      <button onClick={handleAddClick}>Add More</button>
    </div>
  );
};

export default SoundsInput;
