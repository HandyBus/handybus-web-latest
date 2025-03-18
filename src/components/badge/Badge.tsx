import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  children: ReactNode;
  className?: string;
}

const Badge = ({ children, className }: Props) => {
  return (
    <div
      className={twMerge(
        'flex h-24 items-center justify-center rounded-full px-12 text-10 font-600',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Badge;
