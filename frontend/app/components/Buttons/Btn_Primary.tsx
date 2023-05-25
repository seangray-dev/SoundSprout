import React, { ReactNode } from 'react';

interface BtnPrimaryProps {
  children?: ReactNode;
}

const Btn_Primary = (props: BtnPrimaryProps) => {
  return (
    <button className='flex items-center py-5 px-8 gap-4 bg-purple rounded-full text-white font-bold hover:opacity-70 transition-opacity duration-300 w-full'>
      {props.children}
    </button>
  );
};

export default Btn_Primary;
