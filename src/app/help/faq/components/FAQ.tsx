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
        className={`flex cursor-pointer items-center justify-between gap-8 p-16 transition-all duration-150 ${fold ? 'text-16 font-500' : 'text-20 font-700'} text-grey-800`}
        onClick={onClick}
      >
        <h2>{title}</h2>
        <span
          className={`text-16 text-grey-600-sub transition-transform duration-150 ${fold ? 'rotate-180' : ''}`}
        >
          <ChevronUp />
        </span>
      </header>
      <div className={`px-16 pb-16 ${fold ? 'hidden' : ''}`}>
        <div
          className={`flex flex-col gap-16 rounded-[12px] bg-grey-50 p-16 text-16 font-400 text-grey-800 [&>div]:text-16 [&>p>a]:text-primary-main [&>p>a]:underline [&>p]:text-14 [&_li]:ml-16 [&_ol>li]:ml-16 [&_ol>li]:text-16 [&_ol>li]:font-600 [&_ol]:list-decimal [&_ul>li]:text-16 [&_ul]:list-disc `}
        >
          {children}
        </div>
      </div>
    </article>
  );
};

export default FAQ;
