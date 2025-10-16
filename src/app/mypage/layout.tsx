import { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';

export const metadata: Metadata = {
  title: '마이페이지',
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <Suspense>{children}</Suspense>;
};

export default Layout;
