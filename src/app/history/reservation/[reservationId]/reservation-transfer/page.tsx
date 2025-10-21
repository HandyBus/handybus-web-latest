'use client';

import Header from '@/components/header/Header';
import PhoneNumberSection from './components/PhoneNumberSection';
import ShuttleInfoSection from './components/ShuttleInfoSection';
import NoticeSection from './components/NoticeSection';
import SubmitSection from './components/SubmitSection';

const Page = () => {
  return (
    <>
      <Header />
      <main className="flex grow flex-col">
        <PhoneNumberSection />
        <ShuttleInfoSection />
        <NoticeSection />
        <SubmitSection />
      </main>
    </>
  );
};

export default Page;
