'use client';

import Link from 'next/link';
import ArrowRightIcon from '../icons/arrow-right.svg';
import ArrowRightGreyIcon from '../icons/arrow-right-grey.svg';
import { ReactNode } from 'react';
import { customTwMerge } from 'tailwind.config';
import { createAppRedirectPath } from '@/hooks/useAppRouter';

interface Props {
  children: ReactNode;
  href?: string;
  isApp?: boolean;
  onClick?: () => void;
  hideArrow?: boolean;
  replace?: boolean;
  className?: string;
}

const ListButton = ({
  children,
  href,
  isApp = false,
  onClick,
  hideArrow = false,
  replace = false,
  className,
}: Props) => {
  return (
    <>
      {href ? (
        <Link
          href={createAppRedirectPath(href, { isApp })}
          onClick={onClick}
          className={customTwMerge(
            'group flex h-[50px] w-full items-center gap-16 text-left text-16 font-600 active:text-basic-grey-600',
            className,
          )}
          replace={replace}
        >
          {children}
          <div className="ml-auto group-active:hidden">
            {!hideArrow && <ArrowRightIcon />}
          </div>
          <div className="ml-auto hidden group-active:block">
            {!hideArrow && <ArrowRightGreyIcon />}
          </div>
        </Link>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className={customTwMerge(
            'group flex h-[50px] w-full items-center gap-16 text-left text-16 font-600 active:text-basic-grey-600',
            className,
          )}
        >
          {children}
          <div className="ml-auto group-active:hidden">
            {!hideArrow && <ArrowRightIcon />}
          </div>
          <div className="ml-auto hidden group-active:block">
            {!hideArrow && <ArrowRightGreyIcon />}
          </div>
        </button>
      )}
    </>
  );
};

export default ListButton;
