import { TITLE } from '@/constants/metadata';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: `마케팅 활용 동의 약관 | ${TITLE}`,
  description: '핸디버스 마케팅 활용 동의 약관을 확인하세요.',
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
