import Image from 'next/image';
import Link from 'next/link';

interface TrendingCardProps {
  imagePath: string;
  author: string;
  packName: string;
}

const TrendingCard: React.FC<TrendingCardProps> = ({
  imagePath,
  author,
  packName,
}) => {
  const slug = `${packName}`.toLowerCase().replace(/\s+/g, '-');
  return (
    <li className='flex flex-col gap-4'>
      <Link href={`/packs/${slug}`}>
        <Image
          className='hover:cursor-pointer'
          src={imagePath}
          width={315}
          height={315}
          alt={packName}
        />
        <div>
          <p className='font-bold'>{packName}</p>
          <p className=''>{author}</p>
        </div>
      </Link>
    </li>
  );
};

export default TrendingCard;
