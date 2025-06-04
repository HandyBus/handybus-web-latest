import { Metadata } from 'next';
import Header from '@/components/header/Header';
import Image from 'next/image';
import overviewImage1 from './images/service-overview-1.png';
import overviewImage2 from './images/service-overview-2.png';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '소개',
};

const AboutPage = () => {
  return (
    <>
      <Header />
      <main>
        <ServiceOverview />
      </main>
    </>
  );
};

export default AboutPage;

const ServiceOverview = () => {
  return (
    <>
      <Image src={overviewImage1} alt="overview" />
      <section className="flex h-[82px] justify-center bg-basic-grey-50 px-16 pb-32">
        <Link
          href="/help/handybus-guide"
          className="flex h-[50px] w-[100%] items-center justify-center rounded-[8px] bg-brand-primary-400 text-16 font-600 leading-[160%] text-basic-white"
        >
          자세히 알아보기
        </Link>
      </section>
      <Image src={overviewImage2} alt="overview" />
    </>
  );
};
