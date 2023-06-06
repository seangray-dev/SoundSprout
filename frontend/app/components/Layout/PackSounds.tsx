import React, { useState, useEffect } from 'react';

const PackSounds = ({ packId }) => {
  const [sounds, setSounds] = useState([]);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  function getPreviewUrl(audio_file) {
    return `https://res.cloudinary.com/${cloudName}/video/upload/packs${audio_file}`;
  }

  https: useEffect(() => {
    const fetchSounds = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/packs/${packId}/sounds`
      );
      const data = await response.json();
      setSounds(data);
    };

    fetchSounds();
  }, [packId]);

  console.log(
    sounds.map((sound) => {
      return (
        `https://res.cloudinary.com/${cloudName}/video/upload/packs` +
        sound.audio_file
      );
    })
  );

  // res.cloudinary.com/dfcg1eeap/video/upload/packs/Tape%20and%20Vinyl%20Drums/sounds/TVD_snare_tape_vinyl_pong.wav

  //res.cloudinary.com/dfcg1eeap/video/upload/packs/Tape%20%26%20Vinyl%20Drums/sounds/TVD_snare_tape_vinyl_pong

  https: return (
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
            <audio src={getPreviewUrl(sound.audio_file)} controls></audio>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PackSounds;
