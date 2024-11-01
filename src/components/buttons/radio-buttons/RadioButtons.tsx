'use client';

import { ButtonHTMLAttributes, Dispatch, SetStateAction } from 'react';

interface Props<T> {
  values: readonly T[];
  disabled?: boolean;
  selectedValue: T | undefined;
  setSelectedValue: Dispatch<SetStateAction<T | undefined>>;
}

const RadioButtons = <T extends string>({
  values,
  selectedValue,
  setSelectedValue,
  disabled = false,
}: Props<T>) => {
  return (
    <section className="flex w-full flex-wrap gap-8">
      {values.map((value) => (
        <RadioButton
          key={value}
          onClick={() => setSelectedValue(value)}
          selected={value === selectedValue}
          disabled={disabled}
        >
          {value}
        </RadioButton>
      ))}
    </section>
  );
};

export default RadioButtons;

interface RadioButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean;
}

const RadioButton = ({
  children,
  onClick,
  selected,
  disabled,
}: RadioButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`h-[42px] shrink-0 rounded-full border border-grey-100 px-32 text-16 font-500 disabled:opacity-50 ${selected ? 'bg-grey-700 text-white' : 'bg-white text-grey-600-sub active:bg-grey-50'}`}
    >
      {children}
    </button>
  );
};
