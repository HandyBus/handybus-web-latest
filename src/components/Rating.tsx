'use client';

import type { Dispatch, MouseEvent, TouchEvent, SetStateAction } from 'react';
import { useRef, useState } from 'react';
import Star from '@/icons/star.svg';

interface Props {
  size?: 'medium' | 'large';
  value?: number;
  onChange?: Dispatch<number> | Dispatch<SetStateAction<number>>;
}

const Rating = ({ size = 'medium', value = 0, onChange }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const setNewRateByRatio = (relativeX: number, width: number) => {
    const newValue = Math.ceil((relativeX / width) * 5);
    if (onChange && newValue !== value) onChange(newValue);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && containerRef.current) {
      const { left, width } = containerRef.current.getBoundingClientRect();
      setNewRateByRatio(e.clientX - left, width);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (containerRef.current) {
      const { left, width } = containerRef.current.getBoundingClientRect();
      setNewRateByRatio(touch.clientX - left, width);
    }
  };

  const handleClick = (e: MouseEvent) => {
    if (containerRef.current) {
      const { left, width } = containerRef.current.getBoundingClientRect();
      setNewRateByRatio(e.clientX - left, width);
    }
  };

  return (
    <div
      className={`inline-flex touch-pan-y [&>*:first-child]:pl-0 [&>*:last-child]:pr-0
        ${size === 'medium' ? ' text- text-28 *:pl-[1px] *:pr-[1px]' : ' text-16 *:pl-[2px] *:pr-[2px]'}
        `}
      ref={containerRef}
      onClick={handleClick}
      onMouseUp={() => setIsDragging(false)}
      onMouseDown={() => setIsDragging(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`${value >= n ? 'text-primary-main' : 'text-grey-100'} cursor-pointer touch-pan-y`}
        >
          <Star />
        </span>
      ))}
    </div>
  );
};

export default Rating;
