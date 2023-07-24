import Image from 'next/image';
import Link from 'next/link';

interface TrendingCardProps {
	id: number;
	imagePath: string;
	uploader: string;
	packName: string;
}

const TrendingCard: React.FC<TrendingCardProps> = ({
	id,
	imagePath,
	uploader,
	packName,
}) => {
	const slug = `${packName}`.toLowerCase().replace(/\s+/g, '-');
	return (
		<li className='flex flex-col mx-auto md:mx-0 gap-4'>
			<Link href={`/packs/${id}`}>
				<Image
					className='hover:cursor-pointer'
					src={imagePath}
					width={315}
					height={315}
					alt={packName}
				/>
				<div>
					<p className='font-bold'>{packName}</p>
					<p className=''>{uploader}</p>
				</div>
			</Link>
		</li>
	);
};

export default TrendingCard;
