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
  titleClassName = 'text-20',
  showMore,
  ...props
}: Props) => {
  return (
    <article
      {...props}
      className={customTwMerge('px-16 pb-24 pt-32', props.className)}
    >
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
    <header className="flex w-full flex-row justify-between pb-16">
      <h2
        className={customTwMerge(
          'text-20 font-700 leading-[140%]',
          titleClassName,
        )}
      >
        {title}
      </h2>
      {showMore && (
        <Link href={showMore}>
          <span className="inline-flex cursor-pointer items-center gap-[2px] break-keep text-14 font-600 leading-[160%] text-basic-grey-600">
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
