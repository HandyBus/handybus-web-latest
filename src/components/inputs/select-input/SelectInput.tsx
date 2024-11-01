'use client';

import type { Dispatch, SetStateAction } from 'react';

const CHEVRON_ENABLED = `url('/icons/chevron-enabled.svg') calc(100% - 12px) center no-repeat`;
const CHEVRON_DISABLED = `url('/icons/chevron-disabled.svg') calc(100% - 12px) center no-repeat`;
interface Props {
  options: string[];
  onChange?: Dispatch<string> | Dispatch<SetStateAction<string>>;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
}

const SelectInput = ({
  options,
  onChange,
  placeholder,
  value,
  disabled,
}: Props) => {
  return (
    <select
      style={{
        background: disabled ? CHEVRON_DISABLED : CHEVRON_ENABLED,
      }}
      disabled={disabled}
      className={`w-full cursor-pointer appearance-none rounded-none border-b border-b-grey-100 bg-white p-12
        pr-32 disabled:cursor-not-allowed disabled:text-grey-300 disabled:opacity-100
        ${value === undefined ? 'text-grey-300' : 'text-grey-800'}`}
      value={value || placeholder}
      onChange={onChange && ((e) => onChange(e.target.value))}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
      {placeholder !== undefined && (
        <option key={placeholder} value={placeholder} disabled hidden>
          {placeholder}
        </option>
      )}
    </select>
  );
};

export default SelectInput;
