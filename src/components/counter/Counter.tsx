'use client';

import PlusIcon from '/public/icons/baseline-plus.svg';
import MinusIcon from '/public/icons/baseline-minus.svg';
import { ReactNode } from 'react';

const Counter = ({
  count,
  setCount,
  max = 0,
}: {
  count: number;
  setCount: (value: number) => void;
  max?: number;
}) => {
  return (
    <div className="flex w-full items-center justify-center gap-12 border-b border-grey-100 p-12">
      <input
        type="text"
        value={count}
        className="w-full text-16 font-400 leading-[24px] text-grey-800"
        readOnly
      />
      <CounterButton onClick={() => setCount(count > 1 ? count - 1 : 1)}>
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
