'use client';

import PlusIcon from '/public/icons/baseline-plus.svg';
import MinusIcon from '/public/icons/baseline-minus.svg';
import { ChangeEvent, ReactNode } from 'react';

interface Props {
  count: number;
  setCount: (value: number) => void;
  min?: number;
  max?: number;
}

const Counter = ({ count, setCount, min = 0, max = 9 }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < min) {
      setCount(min);
      return;
    } else if (value > max) {
      setCount(max);
      return;
    }
    setCount(value);
  };

  return (
    <div className="flex w-full items-center justify-center gap-12 border-b border-grey-100 p-12">
      <input
        type="text"
        value={count}
        onChange={handleChange}
        className="w-full text-16 font-400 leading-[24px] text-grey-700 outline-none"
      />
      <CounterButton
        onClick={() => setCount(count - 1)}
        disabled={count <= min}
      >
        <MinusIcon
          viewBox="0 0 18 18"
          fill={count === min ? '#ABABAB' : '#4D4D4D'}
        />
      </CounterButton>
      <CounterButton
        onClick={() => setCount(count + 1)}
        disabled={count >= max}
      >
        <PlusIcon
          viewBox="0 0 18 18"
          fill={count === max ? '#ABABAB' : '#4D4D4D'}
        />
      </CounterButton>
    </div>
  );
};

export default Counter;

interface CounterButtonProps {
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
}

const CounterButton = ({
  onClick,
  children,
  disabled = false,
}: CounterButtonProps) => (
  <button
    className="rounded-full bg-grey-50 p-12"
    onClick={onClick}
    type="button"
    disabled={disabled}
  >
    {children}
  </button>
);
