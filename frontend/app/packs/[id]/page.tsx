'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

import Nav from '@/app/components/Layout/Nav';
import AudioPlayer from '@/app/components/Layout/AudioPlayer';
import PackSounds from '@/app/components/Layout/PackSounds';

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

function getCoverArtUrl(publicId) {
  return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}.jpg`;
}

function getPreviewUrl(publicId) {
  return `https://res.cloudinary.com/${cloudName}/video/upload/${publicId}.mp3`;
}

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
            <div>
              <Image
                src={getCoverArtUrl(pack.cover_art_location)}
                width={300}
                height={300}
                alt={pack.name}></Image>
              <span>Preview</span>
              <audio src={getPreviewUrl(pack.preview)} controls></audio>
            </div>
            <article className='flex flex-col gap-6'>
              <div>
                <h1 className='font-bold'>{pack.name}</h1>
                <h2>{pack.uploader.first_name}</h2>
                <p>${pack.price}</p>
              </div>
              <p>{pack.description}</p>
            </article>
          </section>
        )}
      </main>
      <PackSounds packId={params.id} />
      <AudioPlayer />
    </>
  );
}
