import { ReactNode } from 'react';
import Divider from './Divider';
import ChevronRightIcon from 'public/icons/chevron-right.svg';

interface Props {
  children: ReactNode;
  title: ReactNode;
  isExpandable?: boolean;
}

const Section = ({ children, title, isExpandable = false }: Props) => {
  return (
    <>
      <Divider />
      {isExpandable ? (
        <details className="group flex flex-col gap-16 p-16 pb-0 [&>summary::-webkit-details-marker]:hidden [&>summary::marker]:hidden">
          <summary className="flex h-32 cursor-pointer list-none items-center justify-between p-0">
            <h3 className="line-clamp-1 text-22 font-700 text-grey-700">
              {title}
            </h3>
            <span className="rotate-90 group-open:rotate-[-90deg]">
              <ChevronRightIcon />
            </span>
          </summary>
          {children}
          <div className="h-16" />
        </details>
      ) : (
        <section className="w-full px-16 py-32 text-16 font-400 text-grey-700">
          <h3 className="mb-8 line-clamp-1 h-32 text-22 font-700">{title}</h3>
          {children}
        </section>
      )}
    </>
  );
};

export default Section;
