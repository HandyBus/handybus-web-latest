'use client';

import type { MouseEventHandler } from 'react';
import { customTwMerge } from 'tailwind.config';

interface Props<T> {
  items: readonly TabItem<T>[];
  selected: T;
  onSelect?: (value: T) => void;
  className?: string;
}

const Tabs = <T,>({ items, selected, onSelect, className }: Props<T>) => {
  return (
    <>
      <div
        className={customTwMerge(
          'fixed z-10 flex h-40 w-full max-w-500 flex-row bg-basic-white scrollbar-hidden',
          className,
        )}
      >
        {items.flatMap((v) => (
          <Tab
            key={v.label}
            label={v.label}
            selected={v.value === selected}
            onClick={() => onSelect?.(v.value)}
            disabled={v.disabled}
          />
        ))}
        <div className="absolute bottom-0 h-[1px] w-full bg-basic-grey-200" />
        <div
          className="absolute bottom-0 h-[2px] bg-basic-black transition-all duration-300 ease-in-out"
          style={{
            left: `${items.findIndex((item) => item.value === selected) * (100 / items.length)}%`,
            width: `${100 / items.length}%`,
          }}
        />
      </div>
      <div className="h-40 shrink-0" aria-hidden="true" />
    </>
  );
};

export default Tabs;

interface TabItem<T> {
  label: string;
  value: T;
  disabled?: boolean;
}

const Tab = ({
  label,
  selected,
  onClick,
  disabled,
}: {
  label: string;
  selected: boolean;
  onClick?: MouseEventHandler;
  disabled?: boolean;
}) => {
  return (
    <button
      className={customTwMerge(
        'flex-1 whitespace-nowrap p-8 text-16 font-500 text-basic-grey-500 transition-all duration-100 ease-in-out',
        selected && 'font-700 text-basic-black',
        disabled && 'text-basic-grey-500',
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
