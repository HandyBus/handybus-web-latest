'use client';

import type { Dispatch, MouseEvent, TouchEvent, SetStateAction } from 'react';
import { useRef, useState } from 'react';
import Star from 'public/icons/star.svg';

interface Props {
  size?: 'medium' | 'large';
  value?: number;
  onChange: Dispatch<number> | Dispatch<SetStateAction<number>>;
}
const RatingForm = ({ size = 'medium', value = 0, onChange }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const setNewRateByRatio = (relativeX: number, width: number) => {
    const newValue = Math.ceil((relativeX / width) * 5);
    return newValue;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const { left, width } = containerRef.current.getBoundingClientRect();
      const newRate = setNewRateByRatio(e.clientX - left, width);
      setHoverValue(newRate);
      if (isDragging && newRate !== value) {
        onChange(newRate);
      }
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (containerRef.current) {
      const { left, width } = containerRef.current.getBoundingClientRect();
      const newRate = setNewRateByRatio(touch.clientX - left, width);

      onChange(newRate);

      setHoverValue(null);
    }
  };

  const handleClick = (e: MouseEvent) => {
    if (containerRef.current) {
      const { left, width } = containerRef.current.getBoundingClientRect();
      const newRate = setNewRateByRatio(e.clientX - left, width);
      onChange(newRate);
      setHoverValue(null); // Reset hover value after click
    }
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
    setIsDragging(false);
  };

  return (
    <div
      className={`inline-flex cursor-pointer touch-pan-y [&>:first-child]:pl-0  [&>:last-child]:pr-0 
        ${size === 'large' ? 'text-28 *:pl-[2px] *:pr-[2px]' : ' text-16 *:pl-[1px] *:pr-[1px]'}
        `}
      ref={containerRef}
      onClick={handleClick}
      onMouseUp={() => setIsDragging(false)}
      onMouseDown={() => setIsDragging(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`${
            hoverValue === null || hoverValue === value
              ? value >= n
                ? 'text-brand-primary-400'
                : 'text-basic-grey-100'
              : hoverValue >= n
                ? 'text-brand-primary-600'
                : 'text-basic-grey-100'
          } cursor-pointer touch-pan-y`}
        >
          <Star />
        </span>
      ))}
    </div>
  );
};

export default RatingForm;
