import type { UrlObject } from 'url';
import type { HTMLProps, ReactNode } from 'react';
import ChevronRightEm from 'public/icons/chevron-right-em.svg';
import { useFlow } from '@/stacks';

interface Props extends HTMLProps<HTMLDivElement> {
  richTitle: ReactNode;
  showMore?: string | UrlObject;
}

const CardSection = ({ children, richTitle, showMore, ...props }: Props) => {
  return (
    <section className="px-16 py-32" {...props}>
      <Title title={richTitle} showMore={showMore} />
      {children}
    </section>
  );
};

export default CardSection;

interface TitleProps {
  title: ReactNode;
  showMore?: string | UrlObject;
}

const Title = ({ title, showMore }: TitleProps) => {
  const flow = useFlow();
  const handleShowMore = () => {
    flow.push('EventListFromHome', {});
  };
  return (
    <header className="flex w-full flex-row justify-between pb-16">
      <h2 className={'text-20 font-700 leading-[140%]'}>{title}</h2>
      {showMore && (
        <button type="button" onClick={handleShowMore} className="text-left">
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
