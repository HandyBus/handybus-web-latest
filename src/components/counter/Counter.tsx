'use client';

import PlusIcon from '/public/icons/baseline-plus.svg';
import MinusIcon from '/public/icons/baseline-minus.svg';

const Counter = ({
  count,
  setCount,
}: {
  count: number;
  setCount: (value: number) => void;
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
      <CounterButton onClick={() => setCount(count < 9 ? count + 1 : 9)}>
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
