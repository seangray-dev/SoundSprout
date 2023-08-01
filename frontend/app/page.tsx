import BrowseGenres from './components/Layout/BrowseGenres';
import Header from './components/Layout/Header';
import HowItWorks from './components/Layout/HowItWorks';
import TrendingPacks from './components/Layout/TrendingPacks';

export default function Home() {
	return (
		<>
			<Header />
			<TrendingPacks />
			<BrowseGenres />
			<HowItWorks />
		</>
	);
}
