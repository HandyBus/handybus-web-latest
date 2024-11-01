'use client';

import { ButtonHTMLAttributes, useState } from 'react';

interface Props {
  names: readonly string[];
  disabled?: boolean;
}

const RadioButtons = ({ names, disabled = false }: Props) => {
  const [selectedButton, setSelectedButton] = useState('');

  return (
    <section className="flex w-full flex-wrap gap-8">
      {names.map((name) => (
        <RadioButton
          key={name}
          onClick={() => setSelectedButton(name)}
          selected={name === selectedButton}
          disabled={disabled}
        >
          {name}
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
