'use client';

import Heading from '@/app/components/Utils/Heading';
import { useEffect, useState } from 'react';

const OrderSuccess = () => {
	const [downloadLinks, setDownloadLinks] = useState<string[]>([]);

	useEffect(() => {
		// Retrieve the download links from local storage on the client side
		const downloadLinksJSON = localStorage.getItem('downloadLinks') || '[]';
		setDownloadLinks(JSON.parse(downloadLinksJSON));

		// Reset the downloadLinks item in local storage
		localStorage.removeItem('downloadLinks');
	}, []);

	return (
		<section className='container h-full grid place-items-center'>
			<div>
				<Heading className='text-3xl text-center' level={1}>
					Order Successful!
				</Heading>
				<div className='mt-6 flex flex-col gap-4 text-center'>
					<p>Thanks for your purchase!</p>
					<p>Here are your download links:</p>
					<ul>
						{downloadLinks.map((link, index) => (
							<li key={index}>
								<a
									target='_blank'
									rel='noreferrer'
									className='text-purple'
									href={link}
									download={`file_${index}`}>
									Download File {index + 1}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default OrderSuccess;
