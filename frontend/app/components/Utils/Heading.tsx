import { Big_Shoulders_Display } from 'next/font/google';

const bigShouldersDisplay = Big_Shoulders_Display({
  subsets: ['latin'],
});

type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
};

export default function Heading({ level, children, className }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={`${bigShouldersDisplay.className} font-bold ${className}`}>
      {children}
    </Tag>
  );
}
