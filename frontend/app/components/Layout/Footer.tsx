import Image from 'next/image';
import logo from '../../../public/assets/images/logo-no-background.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-2 py-10 text-gray-3'>
      <div className='container'>
        <Image
          className='mb-5'
          src={logo}
          width={150}
          alt='sound-sprout-logo'
        />
        <p className='mb-8'>
          Find, purchase, and sell exceptional sound samples from creators
          worldwide. Your sonic journey begins here.
        </p>
        <hr />
        <p className='mt-5'>Ⓒ {currentYear} Sound Sprout</p>
      </div>
    </footer>
  );
};

export default Footer;
