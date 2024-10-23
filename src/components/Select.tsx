'use client';

import type { Dispatch, SetStateAction } from 'react';

interface Props {
  options: { value: string; label: string }[];
  onChange?: Dispatch<string> | Dispatch<SetStateAction<string>>;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
}

const CHEVRON_ENABLED = `url('/chevron-enabled.svg') calc(100% - 5px) center no-repeat`;
const CHEVRON_DISABLED = `url('/chevron-disabled.svg') calc(100% - 5px) center no-repeat`;

const Select = ({ options, onChange, placeholder, value, disabled }: Props) => {
  const placeholderOpt = { value: 0, label: placeholder };
  return (
    <select
      style={{
        background: disabled ? CHEVRON_DISABLED : CHEVRON_ENABLED,
      }}
      disabled={disabled}
      className={`w-full appearance-none rounded-none border-b border-b-grey-300 bg-white p-8 pr-32
        ${disabled ? 'primary cursor-not-allowed' : 'cursor-pointer'}
        ${value === undefined ? '' : 'text-grey-800'}
        ${disabled || value === undefined ? 'text-grey-300' : ''}`}
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
