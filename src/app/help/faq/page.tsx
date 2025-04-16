'use client';

import Header from '@/components/header/Header';
import ChevronRightEm from 'public/icons/chevron-right-em.svg';
import Footer from '@/components/footer/Footer';
import Link from 'next/link';
import TitledSection from './components/TitledSection';
import Tabs from '@/components/tab/Tabs';
import { useState } from 'react';
import FAQList from './components/FAQList';

const TAB_ITEMS = [
  { label: '예약하기', value: 'reserve' },
  { label: '탑승하기', value: 'boarding' },
  { label: '그 외', value: 'etc' },
];

type TabItem = (typeof TAB_ITEMS)[number];

const CustomerSupport = () => {
  const [selectedTab, setSelectedTab] = useState<TabItem['value']>(
    TAB_ITEMS[0].value,
  );

  return (
    <>
      <main>
        <Header />
        <h1 className="px-16 pt-32 text-20 font-700 leading-[140%]">도움말</h1>
        <TitledSection title="자주 묻는 질문">
          <Tabs
            items={TAB_ITEMS}
            selected={selectedTab}
            onSelect={(value) => {
              setSelectedTab(value);
            }}
          />
          <FAQList selectedTab={selectedTab} />
        </TitledSection>
        <div className="h-8 w-full bg-basic-grey-50" />
        <TitledSection title="이용 약관">
          <NavigationItem
            title="서비스 이용 약관"
            href="/help/faq/terms-of-service"
          />
          <NavigationItem
            title="개인정보 처리 방침"
            href="/help/faq/privacy-policy"
          />
          <NavigationItem
            title="마케팅 활용 동의"
            href="/help/faq/marketing-consent"
          />
        </TitledSection>
        <div className="h-8 w-full bg-basic-grey-50" />
        <TitledSection title="고객센터">
          <NavigationItem
            title="직접 문의하기"
            href="/help/faq/direct-inquiry"
          />
          <NavigationItem
            title="의견 보내기"
            href={`${process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL}`}
            target="_blank"
            rel="noopener noreferrer"
          />
        </TitledSection>
      </main>
      <Footer />
    </>
  );
};

export default CustomerSupport;

interface NavigationItemProps {
  title: string;
  href: string;
  target?: string;
  rel?: string;
}

const NavigationItem = ({ title, href, target, rel }: NavigationItemProps) => {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className="flex w-full flex-row justify-between py-12"
    >
      <p className="text-16 font-600 leading-[160%]">{title}</p>
      <ChevronRightEm className="h-24 w-24 text-basic-grey-400" />
    </Link>
  );
};
