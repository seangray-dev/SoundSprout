'use client';

import React, { useEffect, useState } from 'react';
import { getSoundsByGenre, getPacksByGenre } from '@/app/api/api';
import { useRouter } from 'next/router';
import Nav from '@/app/components/Layout/Nav';
import Footer from '@/app/components/Layout/Footer';
import AudioPlayer from '@/app/components/Layout/AudioPlayer';

const SOUND_URL = process.env.NEXT_PUBLIC_CLOUDINARY_SOUND_URL;

const GenrePage = ({ params }: { params: { id: number } }) => {
  const id = params.id;
  const [packs, setPacks] = useState([]);
  const [sounds, setSounds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const packsData = await getPacksByGenre(id);
        setPacks(packsData);

        const soundsData = await getSoundsByGenre(id);
        setSounds(soundsData);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <>
      <Nav />
      <main>
        <h1>Genre:</h1>
        <h2>Packs:</h2>
        <ul>
          {packs.map((pack) => (
            <li key={pack.id}>
              <p>{pack.name}</p>
            </li>
          ))}
        </ul>

        <h2>Sounds:</h2>
        <ul>
          {sounds.map((sound) => (
            <li key={sound.id}>
              <p>{sound.name}</p>
              <audio controls src={`${SOUND_URL}/${sound.audio_file}`}></audio>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
      <AudioPlayer />
    </>
  );
};

export default GenrePage;
