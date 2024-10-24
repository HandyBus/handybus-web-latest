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
    <div className="inline-flex *:pl-[2px] *:pr-[2px] [&>*:first-child]:pl-0 [&>*:last-child]:pr-0">
      {[1, 2, 3, 4, 5].flatMap((n) => (
        <span
          className={`${value >= n ? 'text-primary-main' : 'text-grey-100'}`}
          onClick={handleClick(n)}
        >
          <Star />
        </span>
      ))}
    </div>
  );
};

export default Rating;
