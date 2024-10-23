'use client';

import type { Dispatch, SetStateAction } from 'react';
import Star from '@/icons/star.svg';

interface Props {
  value?: number;
  onChange?: Dispatch<number> | Dispatch<SetStateAction<number>>;
}

const Rating = ({ value = 0, onChange }: Props) => {
  const handleClick = (n: number) => () => {
    if (onChange) onChange(n);
  };

  return (
    <span className="*:pr-1 inline-flex [&>*:last-child]:pr-0">
      <span
        className={`relative ${value >= 1 ? 'text-primary-main' : 'text-grey-100'}`}
      >
        <div className="absolute h-full min-w-12" onClick={handleClick(0)} />
        <span onClick={handleClick(1)}>
          <Star />
        </span>
      </span>
      <span
        className={`${value >= 2 ? 'text-primary-main' : 'text-grey-100'}`}
        onClick={handleClick(2)}
      >
        <Star />
      </span>
      <span
        className={`${value >= 3 ? 'text-primary-main' : 'text-grey-100'}`}
        onClick={handleClick(3)}
      >
        <Star />
      </span>
      <span
        className={`${value >= 4 ? 'text-primary-main' : 'text-grey-100'}`}
        onClick={handleClick(4)}
      >
        <Star />
      </span>
      <span
        className={`${value >= 5 ? 'text-primary-main' : 'text-grey-100'}`}
        onClick={handleClick(5)}
      >
        <Star />
      </span>
    </span>
  );
};

export default Rating;
