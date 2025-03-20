import type { ButtonHTMLAttributes } from 'react';
import Spinner from 'public/icons/spinner.svg';
import { customTwMerge } from 'tailwind.config';

// NOTE: p-destructive는 primary destructive 버전, s-destructive는 secondary destructive 버전

export type ButtonSize = 'large' | 'medium' | 'small';
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'p-destructive'
  | 's-destructive'
  | 'custom';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
}

const Button = ({
  children,
  size = 'large',
  variant = 'primary',
  isLoading = false,
  className,
  ...rest
}: Props) => {
  const disabled = rest.disabled || isLoading;

  return (
    <button
      disabled={disabled}
      className={customTwMerge(
        DEFAULT_STYLE,
        SIZE_STYLE[size],
        VARIANT_STYLE[variant],
        isLoading && LOADING_STYLE,
        className,
      )}
      {...rest}
    >
      {isLoading ? (
        <>
          <span className="mr-[10px] animate-spin">
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

const DEFAULT_STYLE =
  'flex items-center justify-center whitespace-nowrap break-keep';

const SIZE_STYLE = {
  large: 'w-full h-[50px] rounded-8 text-16 font-600 grow',
  medium: 'w-[87px] h-[50px] rounded-8 text-16 font-600 shrink-0',
  small: 'w-[57px] h-[31px] rounded-6 text-12 font-600 shrink-0',
};

const VARIANT_STYLE = {
  primary:
    'bg-brand-primary-400 text-basic-white active:bg-brand-primary-500 disabled:bg-brand-primary-100',
  secondary:
    'bg-brand-primary-50 text-brand-primary-400 active:bg-brand-primary-100',
  tertiary:
    'bg-basic-grey-100 text-basic-grey-700 active:bg-basic-grey-200 disabled:bg-basic-grey-50 disabled:text-basic-grey-300',
  'p-destructive': 'bg-basic-red-400 text-basic-white active:bg-basic-red-500',
  's-destructive':
    'bg-basic-red-100 text-basic-red-500 active:bg-basic-red-200',
  custom: '',
};

const LOADING_STYLE =
  'bg-basic-grey-50 text-basic-grey-400 disabled:bg-basic-grey-50';
