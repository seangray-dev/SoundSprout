import { Sound, Tag } from '@/app/types';
import { PlayIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import React from 'react';

type SoundProps = {
  sound: Sound;
  tags: Tag[];
};

const SoundComponent = ({ sound, tags }: SoundProps) => {
  return (
    <div className='sound-container'>
      <div className='sound-info'>
        <h3>{sound.name}</h3>
        <div className='tags'>
          {tags.map((tag) => (
            <Link key={tag.id} href={`/search?query=${tag.tag_name}`}>
              {tag.tag_name}
            </Link>
          ))}
        </div>
      </div>
      <div className='play-button'>
        <PlayIcon className='text-gray-500 w-5 h-5 hover:cursor-pointer hover:bg-purple hover:text-white transition-all duration-300' />
      </div>
    </div>
  );
};

export default SoundComponent;
