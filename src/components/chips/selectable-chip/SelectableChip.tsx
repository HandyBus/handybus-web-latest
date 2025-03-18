import type { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  selected?: boolean;
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
      ${isPrimary && !disabled && selected ? 'bg-brand-grey-700 text-basic-white' : ''}
      ${isPrimary && !disabled && !selected ? 'bg-brand-grey-50 text-brand-grey-700' : ''}
      ${isPrimary && disabled && selected ? 'bg-brand-grey-700 text-basic-white opacity-50' : ''}
      ${isPrimary && disabled && !selected ? 'bg-brand-grey-50 text-brand-grey-300' : ''}
      ${!isPrimary && !disabled && selected ? 'border border-brand-grey-600 bg-transparent text-brand-grey-700' : ''}
      ${!isPrimary && !disabled && !selected ? 'bg-brand-grey-50 text-brand-grey-700' : ''}
      ${!isPrimary && disabled && selected ? 'border border-brand-grey-600 bg-transparent text-brand-grey-700 opacity-50' : ''}
      ${!isPrimary && disabled && !selected ? 'bg-brand-grey-50 text-brand-grey-300' : ''}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default SelectableChip;
