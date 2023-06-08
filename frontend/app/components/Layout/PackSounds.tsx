import React, { useState, useEffect, useRef } from 'react';

const PackSounds = ({ packId }) => {
  const [sounds, setSounds] = useState([]);
  const [durations, setDurations] = useState({});
  const audioRefs = useRef([]);

  function getPreviewUrl(audio_file) {
    return `${process.env.NEXT_PUBLIC_CLOUDINARY_SOUND_URL}${audio_file}`;
  }

  useEffect(() => {
    const fetchSounds = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/packs/${packId}/sounds`
      );
      const data = await response.json();
      setSounds(data);
    };

    fetchSounds();
  }, [packId]);

  useEffect(() => {
    audioRefs.current = audioRefs.current.slice(0, sounds.length);
  }, [sounds]);

  const handleLoadedMetadata = (index) => {
    setDurations((durations) => ({
      ...durations,
      [index]: audioRefs.current[index].duration,
    }));
  };

  const formatTime = (seconds) => {
    if (seconds === undefined) {
      return '00:00';
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

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
          <li className='grid' key={index}>
            <div>
              <div className='text-sm'>{sound.name}</div>
              <audio
                controls
                ref={(el) => (audioRefs.current[index] = el)}
                src={getPreviewUrl(sound.audio_file)}
                onLoadedMetadata={() => handleLoadedMetadata(index)}></audio>
            </div>
            <div>{formatTime(durations[index])}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PackSounds;
