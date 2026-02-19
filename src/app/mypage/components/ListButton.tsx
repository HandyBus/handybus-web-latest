'use client';

import Link from 'next/link';
import ArrowRightIcon from 'public/icons/arrow-right.svg';
import NewIcon from 'public/icons/new.svg';
import { ReactNode } from 'react';
import { customTwMerge } from 'tailwind.config';

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  hideArrow?: boolean;
  replace?: boolean;
  className?: string;
  isNew?: boolean;
}

const ListButton = ({
  children,
  href,
  onClick,
  hideArrow = false,
  replace = false,
  className,
  isNew = false,
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
          <span className="relative">
            {children}
            {isNew && (
              <NewIcon className="absolute -right-[10px] top-0 h-[8px] w-[7px]" />
            )}
          </span>
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
          <span className="relative">
            {children}
            {isNew && (
              <NewIcon className="absolute -right-[10px] top-0 h-[8px] w-[7px]" />
            )}
          </span>
          <div className="ml-auto">{!hideArrow && <ArrowRightIcon />}</div>
        </button>
      )}
    </>
  );
};

export default ListButton;
