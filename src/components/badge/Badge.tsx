import { ReactNode } from 'react';
import { customTwMerge } from 'tailwind.config';

// NOTE: 배지의 스타일이 다양하기에 배경색과 텍스트 색상은 별도로 지정해야 함

interface Props {
  children: ReactNode;
  className?: string;
}

const Badge = ({ children, className }: Props) => {
  return (
    <div
      className={customTwMerge(
        'flex h-24 shrink-0 items-center justify-center rounded-full px-8 text-10 font-600',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Badge;
