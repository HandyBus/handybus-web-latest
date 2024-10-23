import type { HTMLProps } from 'react';
import Spinner from '@/icons/spinner.svg';

interface Props extends HTMLProps<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ children, variant = 'primary', loading, ...rest }: Props) => {
  const disabled = rest.disabled || loading;

  return (
    <button
      disabled={disabled}
      className={`
        flex flex-row items-center whitespace-nowrap rounded-full p-12 disabled:cursor-not-allowed disabled:bg-grey-50 disabled:text-grey-300
        ${
          variant === 'primary'
            ? 'bg-primary-main text-white active:bg-primary-700 '
            : 'bg-grey-50 text-grey-700 active:bg-grey-100'
        }
      `}
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
