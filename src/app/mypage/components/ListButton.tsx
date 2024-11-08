'use client';

import Link from 'next/link';
import ArrowRight from 'public/icons/quill-chevron-right.svg';

interface Props {
  title: string;
  href: string;
  description?: string;
  onClick?: () => void;
  hideArrow?: boolean;
}

const ListButton = ({
  title,
  href,
  description,
  onClick,
  hideArrow = false,
}: Props) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex h-56 w-full items-center gap-16 p-16"
    >
      <span className="grow text-left text-16 font-400 text-grey-800">
        {title}
      </span>
      <span className="text-14 font-400 text-grey-500">{description}</span>
      {!hideArrow && (
        <ArrowRight
          color="#5A5A5A"
          width={17}
          height={17}
          viewBox="0 0 21 20"
        />
      )}
    </Link>
  );
};

export default ListButton;
