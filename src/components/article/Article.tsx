import type { UrlObject } from 'url';
import type { HTMLProps, ReactNode } from 'react';
import Link from 'next/link';

interface Props extends HTMLProps<HTMLDivElement> {
  richTitle: ReactNode;
  showMore?: string | UrlObject;
  titleSize?: string;
}

const Article = ({
  children,
  richTitle,
  titleSize = 'text-22',
  showMore,
  ...props
}: Props) => {
  return (
    <article {...props}>
      <Title title={richTitle} titleSize={titleSize} showMore={showMore} />
      {children}
    </article>
  );
};

export default Article;

import ChevronRightEm from 'public/icons/chevron-right-em.svg';

interface TitleProps {
  title: ReactNode;
  titleSize: string;
  showMore?: string | UrlObject;
}

const Title = ({ title, titleSize, showMore }: TitleProps) => {
  return (
    <header className="flex w-full flex-row justify-between px-16 pb-4 pt-60">
      <h2 className={`${titleSize} font-700`}>{title}</h2>
      {showMore && (
        <Link href={showMore}>
          <span className="inline-flex cursor-pointer items-center gap-[2px] break-keep text-14 font-400 text-grey-600-sub">
            전체보기
            <span className="inline-block stroke-1">
              <ChevronRightEm className="h-16 w-16" />
            </span>
          </span>
        </Link>
      )}
    </header>
  );
};
