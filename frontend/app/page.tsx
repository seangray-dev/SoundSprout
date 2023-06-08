import Header from './components/Layout/Header';
import TrendingPacks from './components/Layout/TrendingPacks';
import BrowseGenres from './components/Layout/BrowseGenres';
import HowItWorks from './components/Layout/HowItWorks';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <TrendingPacks />
        <BrowseGenres />
        <HowItWorks />
      </main>
    </>
  );
}
