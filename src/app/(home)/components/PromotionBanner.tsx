'use client';

import { useRef, useState } from 'react';
import type { SwiperRef } from 'swiper/react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual } from 'swiper/modules';
import 'swiper/css';

const Banner = () => {
  const swiper = useRef<SwiperRef>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      {loading && <BannerItem image={bannerImages[0]} />}
      <Swiper
        ref={swiper}
        pagination={true}
        modules={[Virtual]}
        virtual={{ enabled: true }}
        className="relative bg-primary-main"
        onSlideChange={(sw) => setActiveIndex(sw?.activeIndex)}
        onInit={() => setLoading(false)}
      >
        {bannerImages.map((image) => (
          <SwiperSlide key={image.alt} className="aspect-[150/92]">
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
    alt: '집에서 콘서트장까지 함께, 핸디버스와 함께',
    href: '/help/about',
  },
  { image: Image2, alt: '핸디버스는 어떻게 이용해요?', href: '/help/how-to' },
  {
    image: Image3,
    alt: '핸디버스와 함께한 지난 콘서트 화끈한 열기 느끼러 가기',
    href: '/help/reviews',
  },
] as const;

const BannerItem = ({ image }: { image: BannerItem }) => (
  <Link key={image.alt} href={image.href}>
    <div className="relative aspect-[150/92] w-[min(500px,100vw)]">
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
