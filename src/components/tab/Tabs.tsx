'use client';

import { MouseEventHandler } from 'react';

interface Props<T> {
  items: TabItem<T>[];
  selected: T;
  onSelect?: (value: T) => void;
}

const Tabs = <T,>({ items, selected, onSelect }: Props<T>) => {
  const len = items.length;

  return (
    <div className="flex w-full flex-row overflow-x-scroll">
      {items.flatMap((v, i) => (
        <>
          <Tab
            key={`${v.label}Tab${i}`}
            label={v.label}
            selected={v.value === selected}
            onClick={() => onSelect?.(v.value)}
          />
          <div
            key={`${v.label}div${i}`}
            className={`border-b-2 border-b-grey-100 ${len - 1 === i ? 'w-full' : 'w-[7px]'}`}
          />
        </>
      ))}
    </div>
  );
};

export default Tabs;

interface TabItem<T> {
  label: string;
  value: T;
}

const Tab = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick?: MouseEventHandler;
}) => {
  return (
    <button
      className={`whitespace-nowrap p-8 text-14 font-600
        ${selected ? 'border-b-2 border-b-black' : 'border-b-2 border-b-grey-100 text-grey-500'}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
