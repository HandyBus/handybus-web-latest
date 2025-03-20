import type { UrlObject } from 'url';
import type { HTMLProps, ReactNode } from 'react';
import Link from 'next/link';
import ChevronRightEm from 'public/icons/chevron-right-em.svg';
import { customTwMerge } from 'tailwind.config';

interface Props extends HTMLProps<HTMLDivElement> {
  richTitle: ReactNode;
  showMore?: string | UrlObject;
  titleClassName?: string;
}

const Article = ({
  children,
  richTitle,
  titleClassName = 'text-22',
  showMore,
  ...props
}: Props) => {
  return (
    <article {...props}>
      <Title
        title={richTitle}
        titleClassName={titleClassName}
        showMore={showMore}
      />
      {children}
    </article>
  );
};

export default Article;

interface TitleProps {
  title: ReactNode;
  titleClassName: string;
  showMore?: string | UrlObject;
}

const Title = ({ title, titleClassName, showMore }: TitleProps) => {
  return (
    <header className="flex w-full flex-row justify-between px-16 pb-4 pt-60">
      <h2 className={customTwMerge(titleClassName, 'font-700')}>{title}</h2>
      {showMore && (
        <Link href={showMore}>
          <span className="text-basic-grey-600 inline-flex cursor-pointer items-center gap-[2px] break-keep text-14 font-400">
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
