import Header from '@/components/header/Header';
import { ReactNode } from 'react';
import { headers } from 'next/headers';
import { getIsAppFromUserAgentServer } from '@/utils/environment.util';

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
