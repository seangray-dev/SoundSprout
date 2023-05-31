'use client';

import { useEffect, useState } from 'react';
import Heading from '../Utils/Heading';
import TrendingCard from './TrendingCard';

type TrendingPack = {
  id: number;
  cover_art_location: string;
  uploader: number;
  name: string;
};

const TrendingPacks = () => {
  const [trendingPacks, setTrendingPacks] = useState<TrendingPack[]>([]);

  useEffect(() => {
    const fetchTrendingPacks = async () => {
      try {
        const res = await fetch('http://localhost:8000/packs/trending/');
        const data = await res.json();
        setTrendingPacks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrendingPacks();
  }, []);

  return (
    <section className='container py-10'>
      <Heading level={2} className='text-[28px] uppercase'>
        Trending Packs
      </Heading>
      <p className='capitalize mb-10'>
        Checkout our weekly updated trending Packs.
      </p>
      <ul className='flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-8'>
        {trendingPacks.map((pack) => (
          <TrendingCard
            key={pack.id}
            imagePath={pack.cover_art_location}
            uploader={
              // @ts-ignore
              pack.uploader.first_name
            }
            packName={pack.name}
          />
        ))}
      </ul>
    </section>
  );
};

export default TrendingPacks;
