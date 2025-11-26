'use client';

import type { HTMLProps, ReactNode } from 'react';
import ChevronRightEm from 'public/icons/chevron-right-em.svg';
import { customTwMerge } from 'tailwind.config';
import { ActivityName, useFlow } from '@/stacks';

interface Props extends HTMLProps<HTMLDivElement> {
  richTitle: ReactNode;
  showMore?: ActivityName;
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
      className={customTwMerge('px-16 py-24', props.className)}
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
  showMore?: ActivityName;
}

const Title = ({ title, titleClassName, showMore }: TitleProps) => {
  const flow = useFlow();
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
        <button type="button" onClick={() => flow.push(showMore, {})}>
          <span className="inline-flex cursor-pointer items-center gap-[2px] break-keep text-14 font-600 leading-[160%] text-basic-grey-600">
            전체보기
            <span className="inline-block stroke-1">
              <ChevronRightEm className="h-16 w-16 stroke-[2px]" />
            </span>
          </span>
        </button>
      )}
    </header>
  );
};
