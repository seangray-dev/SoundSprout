import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Heading from '../components/Utils/Heading';
import { Button } from '../components/ui/button';

const validationSchema = Yup.object({
	cardName: Yup.string().required('Cardholder Name is required'),
	cardNumber: Yup.string()
		.required('Card Number is required')
		.length(16, 'Card Number must be 16 characters long'),
	expirationDate: Yup.string().required('Expiration Date is required'),
	cvv: Yup.string()
		.required('CVV is required')
		.length(3, 'CVV must be 3 characters long'),
});

const PaymentInfoForm = () => {
	return (
		<section className='mt-6 border rounded-md p-4'>
			<Heading level={2} className='text-2xl mb-6'>
				Payment Info
			</Heading>
			<Formik
				initialValues={{
					cardName: '',
					cardNumber: '',
					expirationDate: '',
					cvv: '',
				}}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					console.log(values);
					setSubmitting(false);
				}}>
				<Form className='flex flex-col gap-4'>
					<div className='relative flex flex-col gap-1'>
						<label htmlFor='cardName'>Cardholder Name</label>
						<Field
							className='border rounded-md outline-none focus:border-purple p-2 transition-all duration-300'
							name='cardName'
							type='text'
						/>
						<ErrorMessage
							className='text-red-500 text-sm absolute bottom-3 right-2'
							name='cardName'
							component='div'
						/>
					</div>
					<div className='relative flex flex-col gap-1'>
						<label htmlFor='cardNumber'>Card Number</label>
						<Field
							className='border rounded-md outline-none focus:border-purple p-2 transition-all duration-300'
							name='cardNumber'
							type='text'
						/>
						<ErrorMessage
							className='text-red-500 text-sm absolute bottom-3 right-2'
							name='cardNumber'
							component='div'
						/>
					</div>
					<div className='relative flex flex-col gap-1'>
						<label htmlFor='expirationDate'>Expiration Date (MM/YY)</label>
						<Field
							className='border rounded-md outline-none focus:border-purple p-2 transition-all duration-300'
							name='expirationDate'
							type='text'
						/>
						<ErrorMessage
							className='text-red-500 text-sm absolute bottom-3 right-2'
							name='expirationDate'
							component='div'
						/>
					</div>
					<div className='relative flex flex-col gap-1'>
						<label htmlFor='cvv'>CVV</label>
						<Field
							className='border rounded-md outline-none focus:border-purple p-2 transition-all duration-300'
							name='cvv'
							type='text'
						/>
						<ErrorMessage
							className='text-red-500 text-sm absolute bottom-3 right-2'
							name='cvv'
							component='div'
						/>
					</div>
					<Button
						className='bg-purple border border-purple py-2 text-base hover:bg-white hover:text-purple'
						type='submit'>
						Submit Payment
					</Button>
				</Form>
			</Formik>
		</section>
	);
};

export default PaymentInfoForm;
