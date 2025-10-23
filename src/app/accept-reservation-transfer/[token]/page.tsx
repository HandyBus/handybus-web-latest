'use client';

import Header from '@/components/header/Header';
import ShuttleInfoSection from './components/ShuttleInfoSection';
import NoticeSection from './components/NoticeSection';
import SubmitSection from './components/SubmitSection';
import GiftIcon from './icons/gift.svg';
import SenderSection from './components/SenderSection';

const Page = () => {
  return (
    <>
      <Header />
      <main className="flex grow flex-col">
        <section className="flex flex-col gap-16 px-16 pb-8 pt-12">
          <GiftIcon />
          <h1 className="text-18 font-600 leading-[140%]">
            윤딩동님께서
            <br />
            탑승권을 보냈어요!
          </h1>
        </section>
        <ShuttleInfoSection />
        <SenderSection />
        <NoticeSection />
        <SubmitSection />
      </main>
    </>
  );
};

export default Page;
