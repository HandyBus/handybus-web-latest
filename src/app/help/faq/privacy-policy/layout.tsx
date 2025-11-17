import { TITLE } from '@/constants/metadata';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: `개인정보 처리 방침 | ${TITLE}`,
  description: '핸디버스 개인정보 처리 방침을 확인하세요.',
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
