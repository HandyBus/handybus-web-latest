'use client';

import type { MouseEventHandler } from 'react';
import { Fragment } from 'react';

interface Props<T> {
  items: TabItem<T>[];
  selected: T;
  onSelect?: (value: T) => void;
}

const Tabs = <T,>({ items, selected, onSelect }: Props<T>) => {
  const len = items.length;

  return (
    <div className="flex w-full flex-row overflow-x-scroll scrollbar-hidden">
      {items.flatMap((v, i) => (
        <Fragment key={v.label}>
          <Tab
            label={v.label}
            selected={v.value === selected}
            onClick={() => onSelect?.(v.value)}
          />
          <div
            className={`border-b-2 border-b-grey-100 ${len - 1 === i ? 'w-full' : 'w-[7px]'}`}
          />
        </Fragment>
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
