import trendingPacksData from '../../../data/trendingPacksData.json';
import Heading from '../Utils/Heading';
import TrendingCard from './TrendingCard';

const TrendingPacks = () => {
	return (
		<section className='container py-10'>
			<Heading level={2} className='text-[28px] uppercase'>
				Trending Packs
			</Heading>
			<p className='capitalize mb-10'>
				Checkout our weekly updated trending Packs.
			</p>
			<ul className='flex flex-col gap-6 md:flex-row md:justify-between md:gap-8'>
				{trendingPacksData.trendingPacks.map((pack) => (
					<TrendingCard
						id={pack.id}
						key={pack.id}
						imagePath={pack.imagePath}
						uploader={pack.uploader}
						packName={pack.packName}
					/>
				))}
			</ul>
		</section>
	);
};

export default TrendingPacks;
