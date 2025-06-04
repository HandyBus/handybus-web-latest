'use client';

import Button from '@/components/buttons/button/Button';
import Image, { StaticImageData } from 'next/image';
import guideImage from './images/handybus-guide.png';
import guideImageStep1 from './images/handybus-guide-step-1.png';
import guideImageStep2 from './images/handybus-guide-step-2.png';
import guideImageStep3 from './images/handybus-guide-step-3.png';
import guideImageStep4 from './images/handybus-guide-step-4.png';
import guideImageStep5 from './images/handybus-guide-step-5.png';
import guideImageStep6 from './images/handybus-guide-step-6.png';
import handypartyGuideImageStep1 from './images/handyparty-guide-step-1.png';
import handypartyGuideImageStep2 from './images/handyparty-guide-step-2.png';
import handypartyGuideImageStep3 from './images/handyparty-guide-step-3.png';
import handypartyGuideImageStep4 from './images/handyparty-guide-step-4.png';
import handypartyGuideImageStep5 from './images/handyparty-guide-step-5.png';
import handypartyGuideImageStep6 from './images/handyparty-guide-step-6.png';
import handypartyGuideImageStep7 from './images/handyparty-guide-step-7.png';
import Link from 'next/link';
import ChevronRightEmIcon from 'public/icons/chevron-right-em.svg';
import Header from '@/components/header/Header';
import Tabs from '@/components/tab/Tabs';
import { ReactNode, useState } from 'react';

const HandybusGuide = () => {
  const [currentTab, setCurrentTab] = useState<'SHUTTLE_BUS' | 'HANDY_PARTY'>(
    'SHUTTLE_BUS',
  );

  const handleChangeTab = (value: 'SHUTTLE_BUS' | 'HANDY_PARTY') => {
    setCurrentTab(value);
  };

  return (
    <main>
      <Header />
      <figure>
        <Image src={guideImage} alt="핸디버스 가이드" quality={100} />
      </figure>
      <article className="mx-16 mb-16 flex flex-col">
        <section className="mt-16 flex flex-col gap-8">
          <h1 className="text-22 font-700 leading-[140%]">핸디버스 가이드</h1>
          <p className="text-16 font-500 leading-[160%] text-basic-grey-700">
            핸디버스에 오신 걸 환영해요! 여러분의 원활한 셔틀 여정을 위해 셔틀
            예약 과정을 알려드릴게요.
          </p>
        </section>
        <Tabs
          items={
            [
              { label: '셔틀버스', value: 'SHUTTLE_BUS' },
              { label: '핸디팟', value: 'HANDY_PARTY' },
            ] as const
          }
          selected={currentTab}
          onSelect={handleChangeTab}
          className="my-48"
        />
        <section className="flex flex-col gap-64">
          {currentTab === 'SHUTTLE_BUS'
            ? HANDYBUS_GUIDE_STEPS.map((item) => (
                <GuideItem key={item.order} {...item} />
              ))
            : HANDYPARTY_GUIDE_STEPS.map((item) => (
                <GuideItem key={item.order} {...item} />
              ))}
          <nav className="flex flex-col gap-16">
            <h2 className="text-18 font-600 leading-[140%]">
              핸디버스 탈 준비 되셨나요?
            </h2>
            <Link href="/event">
              <Button variant="secondary">행사 둘러보기</Button>
            </Link>
            <Link href="/help/faq">
              <Button variant="tertiary">자주 묻는 질문</Button>
            </Link>
          </nav>
        </section>
      </article>
    </main>
  );
};

export default HandybusGuide;

interface GuideItemProps {
  order: number;
  title: string;
  description: ReactNode;
  subDescription?: string;
  image: StaticImageData;
  tagDescription?: string;
  redirectUrl?: string;
}

const GuideItem = ({
  order,
  title,
  description,
  subDescription,
  image,
  tagDescription,
  redirectUrl,
}: GuideItemProps) => {
  return (
    <section className="flex flex-col gap-16">
      <div className="flex gap-8">
        <div className="h-[25px] w-28 rounded-6 bg-basic-grey-100 text-center text-18 font-600 leading-[140%] text-basic-grey-700">
          {order}
        </div>
        <h2 className="text-18 font-600 leading-[140%]">{title}</h2>
        {tagDescription && <Tag>{tagDescription}</Tag>}
      </div>
      <figure>
        <Image src={image} alt={title} quality={100} />
      </figure>
      <div>
        <p className="text-16 font-400 leading-[160%] text-basic-grey-700">
          {description}
        </p>
        {subDescription && (
          <p className="pt-4 text-14 font-500 leading-[160%] text-basic-grey-400">
            {subDescription}
          </p>
        )}
      </div>
      {redirectUrl && (
        <Link href={redirectUrl} target="_blank">
          <Button
            variant="text"
            className="flex items-center gap-[10px] text-16 font-600 leading-[140%]"
          >
            공식 X 계정 바로가기
            <ChevronRightEmIcon className="h-16 w-16 stroke-2 text-basic-grey-700" />
          </Button>
        </Link>
      )}
    </section>
  );
};

const Tag = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-[42px] border border-basic-grey-200 px-8 py-4 text-center text-10 font-600 leading-[160%] text-basic-grey-700">
      {children}
    </div>
  );
};

const HANDYBUS_GUIDE_STEPS = [
  {
    order: 1,
    title: '수요조사 참여',
    description:
      '행사 별 셔틀이 열리도록 수요조사에 참여하세요. 원하는 지역과 정류장을 선택하고, ‘요청하기’를 누르면 참여가 완료돼요. 수요조사는 행사 15일 전에 마감되며, 기준 인원을 넘은 지역에 노선이 개설돼요.',
    image: guideImageStep1,
    tagDescription: '탑승 15일 전 마감',
  },
  {
    order: 2,
    title: '셔틀 오픈 알림',
    description:
      '요청한 지역에 셔틀이 열리면 카카오톡으로 알림을 보내드려요. 핸디버스 공식 X 계정 (@Handy_Bus)에도 공지되니 확인해 주세요. 예약을 받는 셔틀은 무산 없이 100% 운행돼요. 인기 정류장은 빠르게 매진되니 서둘러 예약하세요!',
    image: guideImageStep2,
    redirectUrl: 'https://x.com/Handy_Bus',
  },
  {
    order: 3,
    title: '예약하기',
    description:
      '노선 정보를 확인한 후 예약을 진행하세요. 간편 결제로 더욱 손쉽게 결제가 가능해요. 이미 마감된 노선이라면, ‘추가 셔틀 요청하기’ 기능을 이용할 수 있어요.',
    image: guideImageStep3,
    tagDescription: '탑승 4일 전 마감',
  },
  {
    order: 4,
    title: '오픈채팅방 참여',
    description:
      '모든 배차 정보와 인원이 확정되면, 핸디가 오픈채팅방을 개설해요. 채팅방 개설 알림톡으로 받은 링크를 통해 입장해 주세요. 오픈채팅방에서 자유롭게 이야기 나누세요!',
    image: guideImageStep4,
    tagDescription: '탑승 4일 전 초대',
  },
  {
    order: 5,
    title: '최종 공지',
    description:
      '오픈채팅방을 통해 최종 탑승 안내를 드려요. 정류장 위치와 시간 등 꼭 확인해 주세요.',
    image: guideImageStep5,
    tagDescription: '탑승 2일 전 공지',
  },
  {
    order: 6,
    title: '탑승',
    description:
      '예약하신 시간과 정류장에 맞춰 셔틀버스에 탑승하세요! 당일 교통 상황 등으로 인한 실시간 변동 사항은 오픈 채팅방을 통해 공지드릴게요.',
    image: guideImageStep6,
    tagDescription: '탑승 당일',
  },
];

const HANDYPARTY_GUIDE_STEPS = [
  {
    order: 1,
    title: '수요조사 참여',
    description:
      '행사 별 셔틀이 열리도록 수요조사에 참여하세요. 원하는 지역과 정류장을 선택하고, ‘요청하기’를 누르면 참여가 완료돼요. 수요조사는 행사 15일 전에 마감되며, 기준 인원을 넘은 지역에 노선이 개설돼요.',
    image: handypartyGuideImageStep1,
    tagDescription: '탑승 15일 전 마감',
  },
  {
    order: 2,
    title: '셔틀 오픈 알림',
    description:
      '요청한 지역에 셔틀이 열리면 카카오톡으로 알림을 보내드려요. 공지사항에서도 노선에 대한 정보를 확인할 수 있어요. 인기 정류장은 빠르게 매진되니 서둘러 예약하세요!',
    image: handypartyGuideImageStep2,
  },
  {
    order: 3,
    title: '예약하기',
    description: (
      <>
        우리 동네 정류장을 골라주세요. 예를 들어, &apos;서울특별시 성북구 안암로
        145&apos;라면 <strong>[집앞하차] 서울 성북구 정류장</strong>을 찾아
        예약을 진행해 주세요.
      </>
    ),
    image: handypartyGuideImageStep3,
  },
  {
    order: 4,
    title: '셔틀 확정 알림',
    description:
      '탑승일 기준 5일 전까지 운행 확정 여부를 안내드려요. 확정 시 탑승 주소 입력 링크를, 무산 시 취소 안내 및 환불이 즉시 진행되니 핸디버스의 소식을 기다려주세요!',
    image: handypartyGuideImageStep4,
    tagDescription: '탑승 5일 전',
  },
  {
    order: 5,
    title: '탑승 주소 입력',
    description:
      '운행 확정 알림과 함께 문자로 발송되는 링크에 희망하는 정확한 주소를 남겨주세요. 해당 장소에서 탑승, 하차하실 수 있어요.',
    subDescription:
      '* 입력하신 주소는 서비스 이용 목적 외에 절대 사용되지 않습니다.',
    image: handypartyGuideImageStep5,
    tagDescription: '개별 안내',
  },
  {
    order: 6,
    title: '오픈채팅방 참여',
    description:
      '기사님과 차량 배차가 완료되면, 오픈채팅방 링크를 전달해 드려요. 탑승 전까지 오픈채팅방에서 자유롭게 이야기를 나누어 보세요!',
    image: handypartyGuideImageStep6,
    tagDescription: '탑승 1일 전 초대',
  },
  {
    order: 7,
    title: '탑승',
    description:
      '탑승 30분 전까지 기사님의 개별 연락으로 주차 위치를 안내받을 수 있어요. 정해진 시간에 맞춰 도착하지 않거나, 연락이 두절되는 경우 탑승이 어려울 수 있으니 꼭 주의해 주세요.',
    image: handypartyGuideImageStep7,
    tagDescription: '탑승 당일',
  },
];
