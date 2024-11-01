import type { UrlObject } from 'url';
import type { HTMLProps } from 'react';
import Link from 'next/link';

interface Props extends HTMLProps<HTMLDivElement> {
  title: string;
  showMore?: string | UrlObject;
}

const Section = ({ children, title, showMore, ...props }: Props) => {
  return (
    <div {...props}>
      <SectionTitle title={title} showMore={showMore} />
      {children}
    </div>
  );
};

export default Section;

import ChevronRight from 'public/icons/chevron-right.svg';

interface TitleProps {
  title: string;
  showMore?: string | UrlObject;
}

const SectionTitle = ({ title, showMore }: TitleProps) => {
  return (
    <div className="flex w-full flex-row justify-between px-16 pb-4 pt-60">
      <h2 className="text-22 font-700">{title}</h2>
      {showMore && (
        <Link href={showMore}>
          <span className="inline-flex cursor-pointer items-center gap-[2px] text-12 font-400 text-grey-600-sub">
            전체보기
            <span className="inline-block stroke-1">{<ChevronRight />}</span>
          </span>
        </Link>
      )}
    </div>
  );
};
