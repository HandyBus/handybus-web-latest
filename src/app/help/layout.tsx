import Header from '@/components/header/Header';
import { ReactNode } from 'react';

export default function WithFooterLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
