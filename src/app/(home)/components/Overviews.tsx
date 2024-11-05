'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Article from '@/components/article/Article';
import Tabs from '@/components/tab/Tabs';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperRef } from 'swiper/react';
import { Virtual } from 'swiper/modules';
import 'swiper/css';

const Overviews = () => {
  const swiper = useRef<SwiperRef>(null);
  const [tab, setTab] = useState(0);

  const handleTabChange = (index: number) => {
    setTab(index);
    swiper?.current?.swiper.slideTo(index);
  };

  return (
    <Article richTitle="핸디버스를 더 자세하게">
      <div className="px-16 py-[10px]">
        <Tabs
          items={[
            { value: 0, label: '핸디버스 소개' },
            { value: 1, label: '서비스 이용 절차' },
            { value: 2, label: '핸디란?' },
            { value: 3, label: 'FAQ' },
          ]}
          selected={tab}
          onSelect={handleTabChange}
        />
      </div>

      <Swiper
        ref={swiper}
        pagination={true}
        modules={[Virtual]}
        virtual={{ enabled: true }}
        className="mySwiper"
        onSlideChange={(sw) => setTab(sw.activeIndex)}
      >
        {Cards.flatMap((card) => (
          <SwiperSlide key={card.key}>
            <div className="px-16 pb-8 pt-8">
              <Link href={card.link}>
                <Card
                  title={card.title}
                  description={card.description}
                  image={card.image}
                />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Article>
  );
};

export default Overviews;

import CardImage1 from './banners/home-overview/1-intro.png';
import CardImage2 from './banners/home-overview/2-howto.png';
import CardImage3 from './banners/home-overview/3-whatishandy.png';
import CardImage4 from './banners/home-overview/4-faq.png';
import Card from '@/components/card/Card';

const Cards = [
  {
    key: 1,
    title: '핸디버스 소개',
    description: '핸디버스는 아이돌 콘서트 전문 셔틀 플랫폼입니다.',
    image: CardImage1,
    link: '/help/about',
  },
  {
    key: 2,
    title: '서비스 이용 절차',
    description: '수요 확인과 예약 과정에 대해서 알아보아요.',
    image: CardImage2,
    link: '/help/how-to',
  },
  {
    key: 3,
    title: '핸디버스의 ‘핸디’란?',
    description: '현장 도우미 핸디를 신청하면 엄청난 혜택이 주어져요.',
    image: CardImage3,
    link: '/help/what-is-handy',
  },
  {
    key: 4,
    title: 'FAQ',
    description: '셔틀 무산, 환불 등 자주 묻는 질문을 정리했어요.',
    image: CardImage4,
    link: '/help/faq',
  },
];
