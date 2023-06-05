import React, { useState, useEffect } from 'react';

const PackSounds = ({ packId }) => {
  const [sounds, setSounds] = useState([]);

  useEffect(() => {
    const fetchSounds = async () => {
      const response = await fetch(
        `http://localhost:8000/packs/${packId}/sounds`
      );
      const data = await response.json();
      setSounds(data);
    };

    fetchSounds();
  }, [packId]);

  return (
    <section className='container mt-10 mb-20'>
      <header className='border-b border-t border-black flex justify-between'>
        <div>Filename</div>
        <div>Time</div>
        <div>Key</div>
        <div>BPM</div>
      </header>
      <ul className='flex flex-col gap-4'>
        {sounds.map((sound, index) => (
          <li className='' key={index}>
            <div className='text-sm'>{sound.name}</div>
            {/* <audio src={sound.audio_file} controls></audio> */}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PackSounds;
