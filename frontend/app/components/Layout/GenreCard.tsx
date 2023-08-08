import Image from 'next/image';
import Link from 'next/link';

interface GenreCardProps {
	imagePath: string;
	genre: string;
	id: number;
}

const sanitizePath = (path: string) => {
	return path
		.replace('/', '&')
		.replace(/[^a-zA-Z0-9\-\&]/g, '')
		.toLowerCase();
};

const GenreCard: React.FC<GenreCardProps> = ({ imagePath, genre, id }) => {
	return (
		<Link href={`/genres/${id}`}>
			<li className='list-none rounded-2xl overflow-hidden hover:cursor-pointer transform transition-transform hover:scale-105 duration-300'>
				<Image
					className='object-cover'
					width={360}
					height={240}
					src={imagePath}
					alt={genre}
				/>
				<div className='bg-gray-2 text-xs font-bold text-white tracking-wide text-center px-5 py-5'>
					<p>{genre}</p>
				</div>
			</li>
		</Link>
	);
};

export default GenreCard;
