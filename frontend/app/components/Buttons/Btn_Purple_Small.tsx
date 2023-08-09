import React, { ReactNode } from 'react';

interface BtnPrimaryProps {
	children?: ReactNode;
	type?: 'button' | 'submit' | 'reset';
}

const Btn_Primary_Small = ({ children, type = 'button' }: BtnPrimaryProps) => {
	return (
		<button
			type={type}
			className='flex justify-center items-center py-1 px-4 gap-1 bg-purple rounded-md text-white hover:opacity-70 transition-opacity duration-300'>
			{children}
		</button>
	);
};

export default Btn_Primary_Small;
