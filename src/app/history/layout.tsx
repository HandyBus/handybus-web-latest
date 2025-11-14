import Header from '@/components/header/Header';
import { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';

export const metadata: Metadata = {
  title: '참여 내역',
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense>
      <Header />
      {children}
    </Suspense>
  );
};

export default Layout;
