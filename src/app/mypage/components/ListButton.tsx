'use client';

import Link from 'next/link';
import ArrowRightIcon from '../icons/arrow-right.svg';
import { ReactNode } from 'react';
import { customTwMerge } from 'tailwind.config';

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  hideArrow?: boolean;
  replace?: boolean;
  className?: string;
}

const ListButton = ({
  children,
  href,
  onClick,
  hideArrow = false,
  replace = false,
  className,
}: Props) => {
  return (
    <>
      {href ? (
        <Link
          href={href}
          onClick={onClick}
          className={customTwMerge(
            'flex h-[50px] w-full items-center gap-16 text-left text-16 font-600',
            className,
          )}
          replace={replace}
        >
          {children}
          <div className="ml-auto">{!hideArrow && <ArrowRightIcon />}</div>
        </Link>
      ) : (
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
      )}
    </>
  );
};

export default ListButton;
