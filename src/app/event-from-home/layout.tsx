import Header from '@/components/header/Header';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '진행 중인 행사 전체보기',
  description: '진행 중인 행사 셔틀을 확인해보세요!',
};

const EventLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default EventLayout;
