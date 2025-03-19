import type { Dispatch, SetStateAction } from 'react';
import Star from 'public/icons/star.svg';
import RatingForm from './RatingForm';

interface Props {
  size?: 'medium' | 'large';
  value?: number;
  onChange?: Dispatch<number> | Dispatch<SetStateAction<number>>;
}
const Rating = ({ size = 'medium', value = 0, onChange }: Props) => {
  if (onChange) return RatingForm({ size, value, onChange });

  return (
    <div
      className={`inline-flex [&>:first-child]:pl-0 [&>:last-child]:pr-0
        ${size === 'large' ? 'text-28 *:pl-[2px] *:pr-[2px]' : ' text-16 *:pl-[1px] *:pr-[1px]'}
        `}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`${value >= n ? 'text-brand-primary-400' : 'text-basic-grey-100'} `}
        >
          <Star />
        </span>
      ))}
    </div>
  );
};

export default Rating;
