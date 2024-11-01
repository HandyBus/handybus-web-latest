'use client';

import type { Dispatch, SetStateAction } from 'react';

const CHEVRON_ENABLED = `url('/icons/chevron-enabled.svg') calc(100% - 12px) center no-repeat`;
const CHEVRON_DISABLED = `url('/icons/chevron-disabled.svg') calc(100% - 12px) center no-repeat`;
interface Props<T> {
  options: readonly T[];
  onChange?: Dispatch<SetStateAction<T | undefined>>;
  value?: T;
  placeholder?: string;
  disabled?: boolean;
}

const SelectInput = <T extends string>({
  options,
  onChange,
  placeholder,
  value,
  disabled,
}: Props<T>) => {
  return (
    <select
      style={{
        background: disabled ? CHEVRON_DISABLED : CHEVRON_ENABLED,
      }}
      disabled={disabled}
      className={`w-full cursor-pointer appearance-none rounded-none border-b border-b-grey-100 bg-white p-12 pr-32
        outline-none disabled:cursor-not-allowed disabled:text-grey-300 disabled:opacity-100
        ${value === undefined ? 'text-grey-300' : 'text-grey-800'}`}
      value={value || placeholder}
      onChange={onChange && ((e) => onChange(e.target.value as T))}
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
