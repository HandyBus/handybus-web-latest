import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '진행 중인 행사 전체보기',
  description: '진행 중인 행사 셔틀을 확인해보세요!',
};

const EventLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default EventLayout;
