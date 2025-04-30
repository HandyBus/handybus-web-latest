'use client';

import Link from 'next/link';
import ArrowRightIcon from '../icons/arrow-right.svg';
import { ReactNode } from 'react';

interface Props {
  content: ReactNode;
  href?: string;
  onClick?: () => void;
  hideArrow?: boolean;
  replace?: boolean;
}

const ListButton = ({
  content,
  href,
  onClick,
  hideArrow = false,
  replace = false,
}: Props) => {
  const Content = () => {
    return (
      <div className="flex grow items-center text-left text-16 font-600">
        {content}
        <div className="ml-auto">{!hideArrow && <ArrowRightIcon />}</div>
      </div>
    );
  };

  return (
    <>
      {href ? (
        <Link
          href={href}
          onClick={onClick}
          className="flex h-[50px] w-full items-center gap-16"
          replace={replace}
        >
          <Content />
        </Link>
      ) : (
        <button
          onClick={onClick}
          className="flex h-56 w-full items-center gap-16 p-16"
        >
          <Content />
        </button>
      )}
    </>
  );
};

export default ListButton;
