import React, { ReactNode } from 'react';

interface BtnPrimaryProps {
	children?: ReactNode;
	type?: 'button' | 'submit' | 'reset';
}

const Btn_Primary = ({ children, type = 'button' }: BtnPrimaryProps) => {
	return (
		<button
			type={type}
			className='flex justify-center items-center py-5 px-8 gap-4 bg-purple rounded-md text-white font-bold hover:opacity-70 transition-opacity duration-300 w-full'>
			{children}
		</button>
	);
};

export default Btn_Primary;
