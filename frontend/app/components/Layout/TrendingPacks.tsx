import Heading from '../Utils/Heading';
import TrendingCard from './TrendingCard';
import trendingPacksData from '../../../data/trendingPacksData.json';

const TrendingPacks = () => {
  return (
    <section className='container py-10'>
      <Heading level={2} className='text-[28px] uppercase'>
        Trending Packs
      </Heading>
      <p className='capitalize mb-10'>
        Checkout our weekly updated trending Packs.
      </p>
      <ul className='flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-8'>
        {trendingPacksData.trendingPacks.map((pack, index) => (
          <TrendingCard
            key={index}
            imagePath={pack.imagePath}
            author={pack.author}
            packName={pack.packName}
          />
        ))}
      </ul>
    </section>
  );
};

export default TrendingPacks;
