import {
	PaymentElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import Heading from '../components/Utils/Heading';
import { Button } from '../components/ui/button';

const PaymentInfoForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (event) => {
		// We don't want to let default form submission happen here,
		// which would refresh the page.
		event.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js hasn't yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		const result = await stripe.confirmPayment({
			//`Elements` instance that was used to create the Payment Element
			elements,
			confirmParams: {
				return_url: 'https://example.com/order/123/complete',
			},
		});

		if (result.error) {
			// Show error to your customer (for example, payment details incomplete)
			console.log(result.error.message);
		} else {
			// Your customer will be redirected to your `return_url`. For some payment
			// methods like iDEAL, your customer will be redirected to an intermediate
			// site first to authorize the payment, then redirected to the `return_url`.
		}
	};

	return (
		<section className='mt-6 border rounded-md p-4'>
			<Heading level={2} className='text-2xl mb-6'>
				Payment Info
			</Heading>
			<form onSubmit={handleSubmit}>
				<PaymentElement />
				<Button
					className='w-full py-2 mt-4 bg-purple border border-purple
					hover:text-purple hover:bg-transparent transition-all duration-300'
					disabled={!stripe}>
					Submit
				</Button>
			</form>
		</section>
	);
};

export default PaymentInfoForm;
