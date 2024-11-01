import type { HTMLProps } from 'react';

interface Props extends HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
}

const IconButton = ({ children, disabled, ...rest }: Props) => {
  return (
    <button
      disabled={disabled}
      className={`
        flex aspect-square h-28 w-28 flex-row
        items-center justify-center whitespace-nowrap
        rounded-full bg-grey-50 text-18 text-grey-700
        active:bg-grey-100 disabled:cursor-not-allowed disabled:bg-grey-50 disabled:text-grey-300
      `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default IconButton;
