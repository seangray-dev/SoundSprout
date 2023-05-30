import Nav from './components/Layout/Nav';
import Header from './components/Layout/Header';
import TrendingPacks from './components/Layout/TrendingPacks';
import BrowseGenres from './components/Layout/BrowseGenres';
import HowItWorks from './components/Layout/HowItWorks';
import Footer from './components/Layout/Footer';
import AudioPlayer from './components/AudioPlayer';

export default function Home() {
  return (
    <>
      <Nav />
      <Header />
      <main>
        <TrendingPacks />
        <BrowseGenres />
        <HowItWorks />
      </main>
      <Footer />
      <AudioPlayer />
    </>
  );
}
