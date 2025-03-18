import type { HTMLProps } from 'react';

interface Props extends HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const IconButton = ({ children, disabled, className, ...rest }: Props) => {
  return (
    <button
      disabled={disabled}
      className={`
        flex aspect-square flex-row
        items-center justify-center whitespace-nowrap
        rounded-full bg-brand-grey-50 text-18 text-brand-grey-700
        active:bg-brand-grey-100 disabled:cursor-not-allowed disabled:bg-brand-grey-50 disabled:text-brand-grey-300 ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default IconButton;
