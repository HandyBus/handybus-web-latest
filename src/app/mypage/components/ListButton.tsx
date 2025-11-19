'use client';

import ArrowRightIcon from 'public/icons/arrow-right.svg';
import { ReactNode } from 'react';
import { customTwMerge } from 'tailwind.config';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  hideArrow?: boolean;
  className?: string;
}

const ListButton = ({
  children,
  onClick,
  hideArrow = false,
  className,
}: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={customTwMerge(
        'flex h-[50px] w-full items-center gap-16 text-left text-16 font-600',
        className,
      )}
    >
      {children}
      <div className="ml-auto">{!hideArrow && <ArrowRightIcon />}</div>
    </button>
  );
};

export default ListButton;
