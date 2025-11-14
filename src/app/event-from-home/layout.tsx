import Header from '@/components/header/Header';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { headers } from 'next/headers';
import { getIsAppFromUserAgentServer } from '@/utils/environment.util';

export const metadata: Metadata = {
  title: '진행 중인 행사 전체보기',
  description: '진행 중인 행사 셔틀을 확인해보세요!',
};

const EventLayout = ({ children }: { children: ReactNode }) => {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || '';
  const isApp = getIsAppFromUserAgentServer(userAgent);
  return (
    <>
      {!isApp && <Header />}
      {children}
    </>
  );
};

export default EventLayout;
