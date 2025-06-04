import { Metadata } from 'next';
import Header from '@/components/header/Header';
import Image from 'next/image';
import OverviewImage1 from './images/service-overview-1.png';
import OverviewImage2 from './images/service-overview-2.png';
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
        <FAQTop5 />
      </main>
    </>
  );
};

export default AboutPage;

const ServiceOverview = () => {
  return (
    <>
      <Image src={OverviewImage1} alt="overview" />
      <section className="flex h-[82px] justify-center bg-basic-grey-50 px-16 pb-32">
        <Link
          href="/help/handybus-guide"
          className="flex h-[50px] w-[100%] items-center justify-center rounded-[8px] bg-brand-primary-400 text-16 font-600 leading-[160%] text-basic-white active:bg-brand-primary-500"
        >
          자세히 알아보기
        </Link>
      </section>
      <Image src={OverviewImage2} alt="overview" />
    </>
  );
};

import ArrowForwardIcon from './icons/arrow-forward.svg';
import { faqs } from '@/data/faq';
import Accordion from '@/components/accordion/Accordion';

const FAQTop5 = () => {
  return (
    <section className="flex flex-col px-16 py-24">
      <h2 className="pb-[40px] text-center text-20 font-600 leading-[140%]">
        자주 묻는 질문
      </h2>
      <section className="pb-16">
        {faqs.slice(0, 5).map((item) => {
          const Content = item.content;
          return (
            <Accordion
              key={item.title}
              title={
                <span className="text-16 font-600 leading-[160%] text-basic-black">
                  {item.title}
                </span>
              }
              containerClassName="px-8"
              titleClassName="py-12"
            >
              <div className="whitespace-pre-line pb-8 text-14 font-500 leading-[160%] text-basic-grey-600 [&>summary>h3]:text-16 [&>summary>h3]:font-600 [&>summary>h3]:leading-[160%] [&>summary>h3]:text-basic-black [&_li]:ml-16 [&_ol>li]:ml-16 [&_ol>li]:whitespace-normal [&_ol>li]:text-16 [&_ol>li]:font-600 [&_ol]:list-decimal [&_ol]:whitespace-normal [&_strong]:text-basic-grey-600 [&_ul>li]:whitespace-normal [&_ul>li]:text-16 [&_ul]:list-disc [&_ul]:whitespace-normal">
                {Content}
              </div>
            </Accordion>
          );
        })}
      </section>
      <Link
        href="/help/faq"
        className="flex h-[46px] items-center justify-center gap-[10px] rounded-[8px] text-16 font-600 leading-[160%] text-basic-grey-700"
      >
        더 많은 질문 보기 <ArrowForwardIcon />
      </Link>
    </section>
  );
};
