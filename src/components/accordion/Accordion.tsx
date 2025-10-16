'use client';

import { customTwMerge } from 'tailwind.config';
import ArrowDownIcon from './icons/arrow-down.svg';
import { ReactNode, useRef } from 'react';

interface Props {
  title: ReactNode;
  children: ReactNode;
  containerClassName?: string;
  titleClassName?: string;
  open?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

const Accordion = ({
  title,
  children,
  containerClassName,
  titleClassName,
  open = false,
  onToggle,
}: Props) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const handleToggle = () => {
    // details의 상태가 변경된 후 상태보장을 위해 setTimeout 사용
    setTimeout(() => {
      if (detailsRef.current && onToggle) {
        onToggle(detailsRef.current.open);
      }
    }, 0);
  };

  return (
    <details
      ref={detailsRef}
      open={open}
      onToggle={handleToggle}
      className={customTwMerge(
        'group flex w-full flex-col px-16 [&>summary::-webkit-details-marker]:hidden [&>summary::marker]:hidden',
        containerClassName,
      )}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-16">
        <h3 className={customTwMerge('py-16 text-16 font-600', titleClassName)}>
          {title}
        </h3>
        <span className="transition-transform duration-100 group-open:rotate-[180deg]">
          <ArrowDownIcon />
        </span>
      </summary>
      {children}
    </details>
  );
};

export default Accordion;
