'use client';

import type { PropsWithChildren } from 'react';
import { useState, useCallback } from 'react';
import ChevronUp from '../icons/faq-chevron-up.svg';

interface Props extends PropsWithChildren {
  title: string;
}

const FAQ = ({ title, children }: Props) => {
  const [fold, setFold] = useState(true);

  const onClick = useCallback(() => {
    setFold((prev) => !prev);
  }, []);

  return (
    <article>
      <header
        className={`flex cursor-pointer items-center justify-between gap-8 p-16 ${fold ? 'text-16 font-500' : 'text-20 font-700'} text-basic-grey-700`}
        onClick={onClick}
      >
        <h2>{title}</h2>
        <span
          className={`text-16 text-basic-grey-600 ${fold ? 'rotate-180' : ''}`}
        >
          <ChevronUp />
        </span>
      </header>
      <div className={`px-16 pb-16 ${fold ? 'hidden' : ''}`}>
        <div
          className={`flex flex-col gap-16 rounded-12 bg-basic-grey-50 p-16 text-14 font-400 text-basic-grey-700 [&>p>a]:text-brand-primary-400 [&>p>a]:underline`}
        >
          {children}
        </div>
      </div>
    </article>
  );
};

export default FAQ;
