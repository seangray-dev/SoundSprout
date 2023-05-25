import Heading from '../Utils/Heading';
import genresData from '../../../data/genresData.json';
import GenreCard from './GenreCard';

const BrowseGenres = () => {
  return (
    <section className='container py-10'>
      <Heading level={2} className='text-[28px] mb-10 uppercase'>
        Browse By Genre
      </Heading>
      <div className='grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8'>
        {genresData.genres.map((genre, index) => (
          <GenreCard
            key={index}
            imagePath={genre.imagePath}
            genre={genre.genre}
          />
        ))}
      </div>
    </section>
  );
};

export default BrowseGenres;
