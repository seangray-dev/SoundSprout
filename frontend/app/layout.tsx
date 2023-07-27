import { ReduxProvider } from '@/redux/provider';
import { Outfit } from 'next/font/google';
import Footer from './components/Layout/Footer';
import Nav from './components/Layout/Nav';
import './globals.css';

const outfit = Outfit({
	subsets: ['latin'],
	weight: ['300', '400', '700'],
});

export const metadata = {
	title: 'Sound Sprout',
	description: 'Discover Unique Sound Samples',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={`${outfit.className} flex flex-col h-screen`}>
				<ReduxProvider>
					<Nav />
					<main className='flex-grow'>{children}</main>
					<Footer />
				</ReduxProvider>
			</body>
		</html>
	);
}
