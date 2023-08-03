'use client';

import Heading from '../components/Utils/Heading';

const OrderSuccess = () => {
	const downloadLinksJSON = localStorage.getItem('downloadLinks') || '[]';
	const downloadLinks = JSON.parse(downloadLinksJSON);

	console.log(downloadLinks);

	return (
		<section className='container h-full grid place-items-center'>
			<div>
				<Heading className='text-3xl text-center' level={1}>
					Order Successful!
				</Heading>
				<div className='mt-6 flex flex-col gap-4 text-center'>
					<p>Thanks for your purchase!</p>
					<p>Your download links:</p>
					<ul>
						{downloadLinks.map((link: string, index: number) => (
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
