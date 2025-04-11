'use client';

import Header from '@/components/header/Header';
import ChevronRightEm from 'public/icons/chevron-right-em.svg';
import Footer from '@/components/footer/Footer';
import Link from 'next/link';
import TitledSection from './components/TitledSection';
import Tabs from '@/components/tab/Tabs';
import { useState } from 'react';
import FAQList from './components/FAQList';

import FAQReservation1 from '@/data/faq/reservation-1-what-is-demand.mdx';
import FAQReservation2 from '@/data/faq/reservation-2-when-can-i-book.mdx';
import FAQReservation3 from '@/data/faq/reservation-3-how-many-people-needed-for-survey.mdx';
import FAQReservation4 from '@/data/faq/reservation-4-no-desired-stop-in-survey.mdx';
import FAQReservation5 from '@/data/faq/reservation-5-when-is-shuttle-confirmed.mdx';
import FAQReservation6 from '@/data/faq/reservation-6-sold-out-additional-shuttle.mdx';
import FAQReservation7 from '@/data/faq/reservation-7-check-reservation-details.mdx';
import FAQReservation8 from '@/data/faq/reservation-8-change-boarding-location.mdx';
import FAQReservation9 from '@/data/faq/reservation-9-cancel-reservation.mdx';
import FAQBoarding1 from '@/data/faq/boarding-1-does-shuttle-stop-at-rest-area.mdx';
import FAQBoarding2 from '@/data/faq/boarding-2-what-bus-is-used-for-service.mdx';
import FAQBoarding3 from '@/data/faq/boarding-3-how-are-seats-assigned.mdx';
import FAQBoarding4 from '@/data/faq/boarding-4-leave-luggage-on-shuttle.mdx';
import FAQBoarding5 from '@/data/faq/boarding-5-change-one-way-to-round-trip.mdx';
import FAQBoarding6 from '@/data/faq/boarding-6-use-one-way-from-round-trip.mdx';
import FAQEtc1 from '@/data/faq/etc-1-did-not-receive-signup-coupon.mdx';
import FAQEtc2 from '@/data/faq/etc-2-what-is-handy.mdx';

const TAB_ITEMS = [
  { label: '예약하기', value: 'reserve' },
  { label: '탑승하기', value: 'boarding' },
  { label: '그 외', value: 'etc' },
];

type TabItem = (typeof TAB_ITEMS)[number];

export const FAQ_ITEMS = [
  { label: '[예약하기] 수요조사란 무엇인가요?', content: FAQReservation1 },
  { label: '[예약하기] 예약은 언제할 수 있나요?', content: FAQReservation2 },
  {
    label: '[예약하기] 수요조사로 몇 명이 모여야 셔틀이 열리나요?',
    content: FAQReservation3,
  },
  {
    label: '[예약하기] 수요조사 중 원하는 정류장이 없어요.',
    content: FAQReservation4,
  },
  {
    label: '[예약하기] 셔틀 운행은 언제 확정되나요?',
    content: FAQReservation5,
  },
  {
    label: '[예약하기] 좌석이 매진되었어요. 추가 셔틀은 안 열리나요?',
    content: FAQReservation6,
  },
  {
    label: '[예약하기] 예약 내역을 확인하고 싶어요.',
    content: FAQReservation7,
  },
  { label: '[예약하기] 탑승지를 변경하고 싶어요.', content: FAQReservation8 },
  { label: '[예약하기] 예약을 취소하고 싶어요', content: FAQReservation9 },
  { label: '[탑승하기] 운행 시 휴게소에 들르나요?', content: FAQBoarding1 },
  { label: '[탑승하기] 어떤 버스로 운행되나요?', content: FAQBoarding2 },
  { label: '[탑승하기] 좌석은 어떻게 정해지나요?', content: FAQBoarding3 },
  {
    label: '[탑승하기] 셔틀버스에 짐을 놓고 내려도 되나요?',
    content: FAQBoarding4,
  },
  {
    label: '[탑승하기] 편도 예매 후, 왕복으로 바꾸고 싶어요.',
    content: FAQBoarding5,
  },
  {
    label: '[탑승하기] 왕복 예매 후, 편도만 탑승해도 되나요?',
    content: FAQBoarding6,
  },
  { label: '[그외] 가입 쿠폰을 받지 못했어요.', content: FAQEtc1 },
  { label: '[그외] 핸디가 뭐에요?', content: FAQEtc2 },
] as const;

const ACCORDION_CONTAINER_CLASS_NAME =
  '[&>div]:text-16 [&>p>a]:text-primary-main [&>p>a]:underline [&>p]:text-14 [&_li]:ml-16 [&_ol>li]:ml-16 [&_ol>li]:text-16 [&_ol>li]:font-600 [&_ol]:list-decimal [&_ul>li]:text-16 [&_ul]:list-disc [&>p]:whitespace-pre-line px-8 [&>summary]:py-12 [&>summary>h3]:text-16 [&>summary>h3]:font-600 [&>summary>h3]:leading-[160%] text-14 font-500 leading-[160%] [&>summary>h3]:text-basic-black [&_strong]:text-basic-grey-700';

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
          <FAQList
            selectedTab={selectedTab}
            containerClassName={ACCORDION_CONTAINER_CLASS_NAME}
          />
        </TitledSection>
        <div className="h-8 w-full bg-basic-grey-50" />
        <TitledSection title="이용 약관">
          <NavigationItem
            title="서비스 이용 약관"
            linkType="internal"
            href="/help/customer-support/terms-of-service"
          />
          <NavigationItem
            title="개인정보 처리 방침"
            linkType="internal"
            href="/help/customer-support/privacy-policy"
          />
          <NavigationItem
            title="마케팅 활용 동의"
            linkType="internal"
            href="/help/customer-support/marketing-consent"
          />
        </TitledSection>
        <div className="h-8 w-full bg-basic-grey-50" />
        <TitledSection title="고객센터">
          <NavigationItem
            title="직접 문의하기"
            linkType="internal"
            href="/help/customer-support/direct-inquiry"
          />
          <NavigationItem
            title="의견 보내기"
            linkType="external"
            href={`${process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL}`}
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
  linkType: 'internal' | 'external';
  href: string;
}

const NavigationItem = ({ title, linkType, href }: NavigationItemProps) => {
  if (linkType === 'internal') {
    return (
      <Link href={href} className="flex w-full flex-row justify-between py-12">
        <p className="text-16 font-600 leading-[160%]">{title}</p>
        <ChevronRightEm className="h-24 w-24 text-basic-grey-400" />
      </Link>
    );
  }
  if (linkType === 'external') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full flex-row justify-between py-12"
      >
        <p className="text-16 font-600 leading-[160%]">{title}</p>
        <ChevronRightEm className="h-24 w-24 text-basic-grey-400" />
      </a>
    );
  }
};
