import type { HTMLProps } from 'react';

interface Props extends HTMLProps<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  selected?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const SelectableChip = ({
  variant = 'primary',
  disabled = false,
  selected = false,
  children,
  ...rest
}: Props) => {
  const isPrimary = variant === 'primary';

  return (
    <button
      className={`whitespace-nowrap rounded-full px-12 py-4 text-14
      ${isPrimary && !disabled && selected ? 'bg-grey-700 text-white' : ''}
      ${isPrimary && !disabled && !selected ? 'bg-grey-50 text-grey-700' : ''}
      ${isPrimary && disabled && selected ? 'bg-grey-700 text-white opacity-50' : ''}
      ${isPrimary && disabled && !selected ? 'bg-grey-50 text-grey-300' : ''}
      ${!isPrimary && !disabled && selected ? 'border border-grey-600 bg-transparent text-grey-700' : ''}
      ${!isPrimary && !disabled && !selected ? 'bg-grey-50 text-grey-700' : ''}
      ${!isPrimary && disabled && selected ? 'border border-grey-600 bg-transparent text-grey-700 opacity-50' : ''}
      ${!isPrimary && disabled && !selected ? 'bg-grey-50 text-grey-300' : ''}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default SelectableChip;
