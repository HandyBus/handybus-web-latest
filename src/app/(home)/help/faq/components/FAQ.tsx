'use client';

import type { PropsWithChildren } from 'react';
import { useState, useCallback } from 'react';
import ChevronUp from '../icons/faq-chevron-up.svg';
import ChevronDown from '../icons/faq-chevron-down.svg';

interface Props extends PropsWithChildren {
  title: string;
}

const FAQ = ({ title, children }: Props) => {
  const [fold, setFold] = useState(true);

  const onClick = useCallback(() => {
    setFold((prev) => !prev);
  }, []);

  return fold ? (
    <Collapsed title={title} onClick={onClick} />
  ) : (
    <Expanded title={title} onClick={onClick}>
      {children}
    </Expanded>
  );
};

export default FAQ;

interface SubProps extends Props {
  onClick: () => void;
}

const Collapsed = ({ title, onClick }: SubProps) => {
  return (
    <div>
      <div
        className="flex cursor-pointer items-center justify-between gap-8 p-16 text-16 font-500 text-grey-800"
        onClick={onClick}
      >
        {title}
        <span className="text-16 text-grey-600-sub">
          <ChevronDown />
        </span>
      </div>
    </div>
  );
};

const Expanded = ({ title, children, onClick }: SubProps) => {
  return (
    <div>
      <div
        className="flex cursor-pointer items-center justify-between gap-8 p-16 text-20 font-700 text-grey-800"
        onClick={onClick}
      >
        {title}
        <span className="text-16 text-grey-600-sub">
          <ChevronUp />
        </span>
      </div>
      <div className="px-16 pb-16">
        <div className="flex flex-col gap-16 rounded-[12px] bg-grey-50 p-16 text-14 font-400 text-grey-800 [&>p>a]:text-primary-main [&>p>a]:underline">
          {children}
        </div>
      </div>
    </div>
  );
};
