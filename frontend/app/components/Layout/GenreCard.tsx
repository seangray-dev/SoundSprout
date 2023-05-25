import Image from 'next/image';

interface GenreCardProps {
  imagePath: string;
  genre: string;
}

const GenreCard: React.FC<GenreCardProps> = ({ imagePath, genre }) => {
  return (
    <li className='list-none rounded-2xl overflow-hidden hover:cursor-pointer'>
      <Image width={240} height={240} src={imagePath} alt={genre} />
      <div className='bg-gray-2 text-xs font-bold text-white tracking-wide text-center px-5 py-5'>
        <p>{genre}</p>
      </div>
    </li>
  );
};

export default GenreCard;
