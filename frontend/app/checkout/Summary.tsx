import { useSelector } from 'react-redux';
import Heading from '../components/Utils/Heading';

interface SummaryProps {
	subtotal: number;
	hst: number;
	total: number;
}

const Summary: React.FC<SummaryProps> = ({ subtotal, hst, total }) => {
	return (
		<section className='mt-6 border rounded-md p-4'>
			<Heading level={2} className='text-2xl mb-6'>
				Summary
			</Heading>
			<div className='flex flex-col gap-4'>
				<div className='flex justify-between items-center border-b pb-2'>
					<span>Subtotal</span>
					<span className='font-bold'>${subtotal}</span>
				</div>
				<div className='flex justify-between items-center border-b pb-2'>
					<span>HST(13%)</span>
					<span className='font-bold'>${hst.toFixed(2)}</span>
				</div>
				<div className='flex justify-between items-center border-b pb-2'>
					<span className='font-bold text-xl'>Total</span>
					<span className='font-bold text-xl'>${total.toFixed(2)}</span>
				</div>
			</div>
		</section>
	);
};

export default Summary;
