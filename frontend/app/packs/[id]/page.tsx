'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

import Nav from '@/app/components/Layout/Nav';
import AudioPlayer from '@/app/components/AudioPlayer';

export default function Packs({ params }: { params: { id: number } }) {
  const [pack, setPack] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/packs/${params.id}/`);
        const data = await res.json();
        setPack(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <>
      <Nav />
      <main className='container mt-10'>
        {pack && (
          <section className=' flex flex-col md:grid grid-cols-2'>
            <div>IMAGE</div>
            <article className='flex flex-col gap-6'>
              <div>
                <h1>{pack.name}</h1>
                <h2>{pack.uploader.first_name}</h2>
              </div>
              <p>{pack.description}</p>
            </article>
          </section>
        )}
      </main>
      <AudioPlayer />
    </>
  );
}
