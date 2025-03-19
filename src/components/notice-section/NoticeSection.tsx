import ChevronRightIcon from 'public/icons/chevron-right.svg';
import { ReactNode } from 'react';
import Guideline from '../guidelines/Guideline';

export const NOTICE_TYPE = {
  CANCELLATION_AND_REFUND: 'cancellation-and-refund',
  TERM_AND_CONDITION: 'term-and-condition',
} as const;

export type NoticeType = (typeof NOTICE_TYPE)[keyof typeof NOTICE_TYPE];

interface Props {
  type: NoticeType;
  noPadding?: boolean;
}

const NoticeSection = ({ type, noPadding = false }: Props) => {
  return (
    <details
      className={`group flex flex-col gap-16 ${
        noPadding ? '' : 'p-16'
      } [&>summary::-webkit-details-marker]:hidden [&>summary::marker]:hidden`}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between">
        <h2 className="text-22 font-700 leading-[30.8px] text-basic-grey-700">
          {type === NOTICE_TYPE.CANCELLATION_AND_REFUND
            ? '취소 및 환불 안내'
            : '유의사항'}
        </h2>
        <span className="rotate-90 group-open:rotate-[-90deg] ">
          <ChevronRightIcon />
        </span>
      </summary>
      {type === NOTICE_TYPE.CANCELLATION_AND_REFUND ? (
        <Wrapper>
          <Guideline type="취소 및 환불 안내" />
        </Wrapper>
      ) : (
        <Wrapper className="text-14 font-400 leading-[22.4px] text-basic-grey-500">
          <Guideline type="유의사항" />
        </Wrapper>
      )}
    </details>
  );
};

export default NoticeSection;

const Wrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <article className="pt-16">
      <section className={`rounded-10 bg-basic-grey-50 p-16 ${className}`}>
        {children}
      </section>
    </article>
  );
};
