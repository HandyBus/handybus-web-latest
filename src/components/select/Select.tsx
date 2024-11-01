'use client';

import type { Dispatch, SetStateAction } from 'react';

interface Props {
  options: { value: string; label: string }[];
  onChange?: Dispatch<string> | Dispatch<SetStateAction<string>>;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
}

const CHEVRON_ENABLED = `url('/icons/chevron-enabled.svg') calc(100% - 5px) center no-repeat`;
const CHEVRON_DISABLED = `url('/icons/chevron-disabled.svg') calc(100% - 5px) center no-repeat`;

const Select = ({ options, onChange, placeholder, value, disabled }: Props) => {
  const placeholderOpt = { value: 0, label: placeholder };
  return (
    <select
      style={{
        background: disabled ? CHEVRON_DISABLED : CHEVRON_ENABLED,
      }}
      disabled={disabled}
      className={`w-full cursor-pointer appearance-none rounded-none border-b border-b-grey-100 bg-white p-12
        pr-32 disabled:cursor-not-allowed disabled:text-grey-300 disabled:opacity-100
        ${value === undefined ? 'text-grey-300' : 'text-grey-800'}`}
      value={value || placeholderOpt.value}
      onChange={onChange && ((e) => onChange(e.target.value))}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
      <option
        key={placeholderOpt.value}
        value={placeholderOpt.value}
        disabled
        hidden
      >
        {placeholderOpt.label}
      </option>
    </select>
  );
};

export default Select;
