import { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';

export const metadata: Metadata = {
  title: '로그인',
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <Suspense>{children}</Suspense>;
};

export default Layout;
