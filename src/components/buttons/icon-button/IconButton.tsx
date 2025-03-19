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
        bg-basic-grey-50 text-basic-grey-700 active:bg-basic-grey-100
        disabled:bg-basic-grey-50 disabled:text-basic-grey-300 flex
        aspect-square flex-row items-center justify-center
        whitespace-nowrap rounded-full text-18 disabled:cursor-not-allowed ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default IconButton;
