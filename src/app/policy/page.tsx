'use client';

import PolicyViewer from '@/components/policy/PolicyViewer';
import ChevronRightIcon from 'public/icons/chevron-right.svg';
import { ReactNode } from 'react';

const Page = () => {
  return (
    <>
      <main className="grow">
        <Wrapper title="서비스 이용 약관">
          <PolicyViewer type="서비스이용약관" />
        </Wrapper>
        <Wrapper title="개인정보처리방침">
          <PolicyViewer type="개인정보처리방침" />
        </Wrapper>
        <Wrapper title="마케팅 활용 동의">
          <PolicyViewer type="마케팅활용동의" />
        </Wrapper>
      </main>
    </>
  );
};

export default Page;

interface WrapperProps {
  title: string;
  children: ReactNode;
}

const Wrapper = ({ title, children }: WrapperProps) => {
  return (
    <details className="group flex flex-col gap-16 p-16 pb-0 [&>summary::-webkit-details-marker]:hidden [&>summary::marker]:hidden">
      <summary className="flex h-32 cursor-pointer list-none items-center justify-between p-0">
        <h3 className="line-clamp-1 text-22 font-700 text-grey-900">{title}</h3>
        <span className="rotate-90 group-open:rotate-[-90deg]">
          <ChevronRightIcon />
        </span>
      </summary>
      {children}
      <div className="h-16" />
    </details>
  );
};
