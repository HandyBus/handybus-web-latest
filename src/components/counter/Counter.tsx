'use client';

import PlusIcon from '/public/icons/baseline-plus.svg';
import MinusIcon from '/public/icons/baseline-minus.svg';
import { ChangeEvent, ReactNode } from 'react';

const Counter = ({
  count,
  setCount,
  max = 9,
}: {
  count: number;
  setCount: (value: number) => void;
  max?: number;
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 0) {
      setCount(0);
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
        className="w-full text-16 font-400 leading-[24px] text-grey-800 outline-none"
      />
      <CounterButton onClick={() => setCount(count > 0 ? count - 1 : 0)}>
        <MinusIcon viewBox="0 0 18 18" />
      </CounterButton>
      <CounterButton
        onClick={() => setCount(count < max ? count + 1 : max)}
        disabled={count >= max}
      >
        <PlusIcon viewBox="0 0 18 18" />
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
