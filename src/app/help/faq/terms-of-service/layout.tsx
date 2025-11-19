import { TITLE } from '@/constants/metadata';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: `서비스 이용 약관 | ${TITLE}`,
  description: '핸디버스 서비스 이용 약관을 확인하세요.',
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
