import { ReactNode, Suspense } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return <Suspense>{children}</Suspense>;
};

export default Layout;
