import Header from '@/components/header/Header';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '모든 아티스트',
  description: '아티스트를 탐색해보세요!',
};

const ArtistLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default ArtistLayout;
