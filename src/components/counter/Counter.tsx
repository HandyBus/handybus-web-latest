'use client';

import { Dispatch, SetStateAction } from 'react';
import PlusIcon from '/public/icons/baseline-plus.svg';
import MinusIcon from '/public/icons/baseline-minus.svg';

const Counter = ({
  count,
  setCount,
}: {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="flex w-full items-center justify-center gap-12 border-b border-grey-100 p-12">
      <input
        type="text"
        value={count}
        className="w-full text-16 font-400 leading-[24px] text-grey-800"
      />
      <CounterButton
        onClick={() => setCount((prev) => (prev > 0 ? prev - 1 : 0))}
      >
        <MinusIcon viewBox="0 0 18 18" />
      </CounterButton>
      <CounterButton
        onClick={() => setCount((prev) => (prev < 9 ? prev + 1 : 9))}
      >
        <PlusIcon viewBox="0 0 18 18" />
      </CounterButton>
    </div>
  );
};

export default Counter;

interface CounterButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const CounterButton = ({ onClick, children }: CounterButtonProps) => (
  <button className="rounded-full bg-grey-50 p-12" onClick={onClick}>
    {children}
  </button>
);
