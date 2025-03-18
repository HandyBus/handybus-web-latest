'use client';

import Link from 'next/link';
import ArrowRight from 'public/icons/quill-chevron-right.svg';

interface Props {
  title: string;
  href?: string;
  description?: string;
  onClick?: () => void;
  hideArrow?: boolean;
  replace?: boolean;
  newTab?: boolean;
}

const ListButton = ({
  title,
  href,
  description,
  onClick,
  hideArrow = false,
  replace = false,
  newTab = false,
}: Props) => {
  const content = (
    <>
      <span className="grow text-left text-16 font-400 text-grey-700">
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
    </>
  );

  if (newTab)
    return (
      <a
        href={href}
        onClick={onClick}
        className="flex h-56 w-full items-center gap-16 p-16"
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  return (
    <>
      {href ? (
        <Link
          href={href}
          onClick={onClick}
          className="flex h-56 w-full items-center gap-16 p-16"
          replace={replace}
        >
          {content}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className="flex h-56 w-full items-center gap-16 p-16"
        >
          {content}
        </button>
      )}
    </>
  );
};

export default ListButton;
