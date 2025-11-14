import Header from '@/components/header/Header';
import { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';
import { headers } from 'next/headers';
import { getIsAppFromUserAgentServer } from '@/utils/environment.util';

export const metadata: Metadata = {
  title: '마이페이지',
};

const Layout = ({ children }: { children: ReactNode }) => {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || '';
  const isApp = getIsAppFromUserAgentServer(userAgent);
  return (
    <Suspense>
      {!isApp && <Header />}
      {children}
    </Suspense>
  );
};

export default Layout;
