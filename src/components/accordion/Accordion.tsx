import { customTwMerge } from 'tailwind.config';
import ArrowDownIcon from './icons/arrow-down.svg';
import { ReactNode } from 'react';

interface Props {
  title: ReactNode;
  children: ReactNode;
  containerClassName?: string;
  open?: boolean;
}

const Accordion = ({
  title,
  children,
  containerClassName,
  open = false,
}: Props) => {
  return (
    <details
      open={open}
      className={customTwMerge(
        'group flex w-full flex-col px-16 [&>summary::-webkit-details-marker]:hidden [&>summary::marker]:hidden',
        containerClassName,
      )}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-16 py-16">
        <h3 className="text-20 font-700">{title}</h3>
        <span className="transition-transform duration-100 group-open:rotate-[180deg]">
          <ArrowDownIcon />
        </span>
      </summary>
      {children}
    </details>
  );
};

export default Accordion;
