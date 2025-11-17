import { TITLE } from '@/constants/metadata';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: `직접 문의하기 | ${TITLE}`,
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
