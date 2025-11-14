import Header from '@/components/header/Header';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { headers } from 'next/headers';
import { getIsAppFromUserAgentServer } from '@/utils/environment.util';

export const metadata: Metadata = {
  title: '모든 탑승권',
};

const Layout = ({ children }: { children: ReactNode }) => {
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

export default Layout;
