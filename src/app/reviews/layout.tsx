import type { PropsWithChildren } from 'react';
import Header from '@/components/header/Header';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
};

export default Layout;
