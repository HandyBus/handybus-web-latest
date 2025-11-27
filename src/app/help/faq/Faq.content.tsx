'use client';

import Header from '@/components/header/Header';
import ArrowRightIcon from './icons/arrow-right.svg';
import Footer from '@/components/footer/Footer';
import TitledSection from './components/TitledSection';
import Tabs from '@/components/tab/Tabs';
import { useState } from 'react';
import FAQList from './components/FAQList';
import FeedbackScreen from '@/components/feedback/FeedbackScreen';
import { ActivityName, useFlow } from '@/stacks';

const TAB_ITEMS = [
  { label: '예약하기', value: 'reservation' },
  { label: '탑승하기', value: 'boarding' },
];

type TabItem = (typeof TAB_ITEMS)[number];

const Faq = () => {
  const [selectedTab, setSelectedTab] = useState<TabItem['value']>(
    TAB_ITEMS[0].value,
  );

  const [showFeedbackScreen, setShowFeedbackScreen] = useState(false);

  const flow = useFlow();
  const handleClick = (stackName: ActivityName) => {
    flow.push(stackName, {});
  };

  return (
    <>
      <Header pageName="도움말" />
      <main className="relative">
        <TitledSection title="자주 묻는 질문">
          <Tabs
            items={TAB_ITEMS}
            selected={selectedTab}
            onSelect={(value) => {
              setSelectedTab(value);
            }}
            className="absolute w-[calc(100%-32px)]"
          />
          <FAQList selectedTab={selectedTab as 'reservation' | 'boarding'} />
        </TitledSection>
        <div className="h-8 w-full bg-basic-grey-50" />
        <TitledSection title="이용 약관">
          <NavigationItem
            title="서비스 이용 약관"
            onClick={() => handleClick('TermsOfService')}
          />
          <NavigationItem
            title="개인정보 처리 방침"
            onClick={() => handleClick('PrivacyPolicy')}
          />
          <NavigationItem
            title="마케팅 활용 동의"
            onClick={() => handleClick('MarketingConsent')}
          />
        </TitledSection>
        <div className="h-8 w-full bg-basic-grey-50" />
        <TitledSection title="고객센터">
          <NavigationItem
            title="직접 문의하기"
            onClick={() => handleClick('DirectInquiry')}
          />
          <button
            className="flex w-full flex-row justify-between py-12"
            onClick={() => setShowFeedbackScreen(true)}
          >
            <p className="text-16 font-600 leading-[160%]">의견 보내기</p>
            <ArrowRightIcon className="h-24 w-24 text-basic-grey-400" />
          </button>
        </TitledSection>
      </main>
      <Footer />
      {showFeedbackScreen && (
        <FeedbackScreen
          subject="도움말"
          closeFeedbackScreen={() => setShowFeedbackScreen(false)}
          hideCloseButton={true}
        />
      )}
    </>
  );
};

export default Faq;

interface NavigationItemProps {
  title: string;
  onClick: () => void;
}

const NavigationItem = ({ title, onClick }: NavigationItemProps) => {
  return (
    <button
      onClick={onClick}
      className="flex w-full flex-row justify-between py-12 text-left"
    >
      <p className="text-16 font-600 leading-[160%]">{title}</p>
      <ArrowRightIcon className="h-24 w-24 text-basic-grey-400" />
    </button>
  );
};
