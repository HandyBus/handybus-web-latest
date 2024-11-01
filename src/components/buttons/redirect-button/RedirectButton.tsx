import type { HTMLProps } from 'react';
import ChevronRight from 'public/icons/chevron-right.svg';

interface Props extends HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  description: string;
}

const RedirectButton = ({ description, children, ...props }: Props) => {
  return (
    <button
      className="flex w-full flex-row items-center justify-between gap-16 rounded-[10px] bg-grey-50 p-24"
      {...props}
    >
      <div className="flex flex-col justify-start gap-4 text-left">
        <span className="text-12 font-400 text-grey-600-sub">
          {description}
        </span>
        <span className="text-22 font-500 text-grey-800">{children}</span>
      </div>
      <span className="text-24 text-grey-600-sub">
        <ChevronRight />
      </span>
    </button>
  );
};

export default RedirectButton;
