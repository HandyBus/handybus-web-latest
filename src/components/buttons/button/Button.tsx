import type { HTMLProps } from 'react';
import Spinner from 'public/icons/spinner.svg';
import { twMerge } from 'tailwind-merge';

interface Props extends HTMLProps<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'alert' | 'modalSecondary' | 'none';
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button = ({
  children,
  variant = 'primary',
  loading,
  className,
  ...rest
}: Props) => {
  const disabled = rest.disabled || loading;

  const variantClasses: { [key: string]: string } = {
    primary: 'bg-primary-main text-white active:bg-primary-700',
    secondary: 'bg-grey-50 text-grey-700 active:bg-grey-100',
    alert: 'bg-red-500 text-14 leading-[22.4px] text-white active:bg-[#EF5350]',
    modalSecondary:
      'bg-grey-50 text-14 font-500 leading-[22.4px] text-grey-700 active:bg-grey-100',
    none: '',
  };

  const buttonClass = `
    flex h-44 w-full flex-row items-center justify-center whitespace-nowrap rounded-full p-12 text-center 
    disabled:cursor-not-allowed disabled:bg-grey-50 disabled:text-grey-300 
    ${variantClasses[variant] || ''}
  `;

  return (
    <button
      disabled={disabled}
      className={twMerge(buttonClass, className)}
      {...rest}
    >
      {loading ? (
        <>
          <span className="mr-4 animate-spin">
            <Spinner />
          </span>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
