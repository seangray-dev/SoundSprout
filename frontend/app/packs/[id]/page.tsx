'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

import Nav from '@/app/components/Layout/Nav';
import AudioPlayer from '@/app/components/AudioPlayer';

export default function Packs({ params }: { params: { id: string } }) {
  const [pack, setPack] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://localhost:8000/packs/${params.id}`);
        setPack(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <>
      <Nav />
      <main className='flex flex-col md:grid grid-cols-2'>
        <h1>Pack ID: {params.id}</h1>
        {pack && (
          <div>
            <h2>{pack.name}</h2>
            <p>{pack.description}</p>
            {/* Display more pack data here */}
          </div>
        )}
      </main>
      <AudioPlayer />
    </>
  );
}
