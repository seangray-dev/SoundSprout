interface HowItWorksItemProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const HowItWorksItem: React.FC<HowItWorksItemProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <li className='bg-gray-2 rounded-2xl p-8 text-white'>
      {icon}
      <h6 className='text-center font-bold mt-5 mb-2'>{title}</h6>
      <p className='text-center'>{description}</p>
    </li>
  );
};

export default HowItWorksItem;
