'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

import AudioPlayer from '@/app/components/Layout/AudioPlayer';
import PackSounds from '@/app/components/Layout/PackSounds';

import { getPackById } from '@/app/api/api';
import { getCoverArtUrl, getPreviewUrl } from '@/app/api/cloudinary';

export default function Packs({ params }: { params: { id: number } }) {
  const [pack, setPack] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPackById(params.id);
        setPack(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <>
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
