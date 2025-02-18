'use client';

import { useRef, useState } from 'react';
import type { SwiperRef } from 'swiper/react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Banner = () => {
  const swiper = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Swiper
        ref={swiper}
        pagination={true}
        className="relative bg-primary-main"
        onSlideChange={(sw) => setActiveIndex(sw?.activeIndex)}
      >
        {bannerImages.map((image) => (
          <SwiperSlide key={image.alt} className="aspect-[375/160]">
            <BannerItem image={image} />
          </SwiperSlide>
        ))}
        <div className="pointer-events-none absolute bottom-[14px] left-[50%] z-50 flex -translate-x-[50%] flex-row gap-[6px]">
          {bannerImages.map((image, index) => (
            <span
              key={image.alt}
              className={`pointer-events-auto h-[6px] cursor-pointer rounded-full ${index == activeIndex ? 'w-[14px] bg-grey-700' : 'w-[6px] bg-grey-100'}`}
              onClick={() => {
                swiper.current?.swiper.slideTo(index);
              }}
            />
          ))}
        </div>
      </Swiper>
    </>
  );
};

export default Banner;

import Image from 'next/image';
import Image1 from '../images/banner-1.png';
import Image2 from '../images/banner-2.png';
import Image3 from '../images/banner-3.png';
import Link from 'next/link';
import { StaticImageData } from 'next/image';
interface BannerItem {
  image: StaticImageData;
  alt: string;
  href: string;
}

const bannerImages: BannerItem[] = [
  {
    image: Image1,
    alt: '지드래곤 월드투어 수요조사 오픈',
    href: '/demand/546562406302617625',
  },
  {
    image: Image2,
    alt: '집에서 콘서트장까지 함께, 핸디버스와 함께',
    href: '/help/about',
  },
  {
    image: Image3,
    alt: '핸디버스는 어떻게 이용해요?',
    href: '/help/how-to',
  },
] as const;

const BannerItem = ({ image }: { image: BannerItem }) => (
  <Link key={image.alt} href={image.href}>
    <div className="relative aspect-[375/161] w-[min(500px,100vw)]">
      <Image
        src={image.image}
        alt={image.alt}
        fill
        className="object-cover"
        loading="eager"
        priority
      />
    </div>
  </Link>
);
