import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '핸디버스 가이드',
  description:
    '핸디버스 수요조사 참여 그리고 셔틀 예약부터 탑승까지의 상세 가이드를 제공합니다.',
};

const HandybusGuideLayout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense>{children}</Suspense>;
};

export default HandybusGuideLayout;
