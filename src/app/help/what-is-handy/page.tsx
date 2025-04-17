import { Metadata } from 'next';
import Header from '@/components/header/Header';
import WhatIsHandyContent from './components/WhatIsHandyContent';

export const metadata: Metadata = {
  title: '핸디란?',
};

const Page = () => {
  return (
    <>
      <Header />
      <WhatIsHandyContent />
    </>
  );
};

export default Page;
