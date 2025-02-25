'use client';

import { useRef, useState } from 'react';
import type { SwiperRef } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';
import Link from 'next/link';
import { AdminHandleBannerRequestBanners } from '@/types/banner.type';

interface Props {
  dynamicBannerImages: AdminHandleBannerRequestBanners[];
}

const PromotionBanner = ({ dynamicBannerImages }: Props) => {
  const swiper = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const images = dynamicBannerImages
    ? dynamicBannerImages.toSorted((a, b) => a.sequence - b.sequence)
    : bannerImages;

  return (
    <>
      <Swiper
        ref={swiper}
        pagination={true}
        className="relative bg-white"
        onSlideChange={(sw) => setActiveIndex(sw?.realIndex)}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        modules={[Autoplay]}
      >
        {images.map((image) => (
          <SwiperSlide key={image.title} className="aspect-[375/160]">
            <BannerItem image={image} />
          </SwiperSlide>
        ))}
        <div className="pointer-events-none absolute bottom-[14px] left-[50%] z-50 flex -translate-x-[50%] flex-row gap-[6px]">
          {images.map((image, index) => (
            <span
              key={image.title}
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

export default PromotionBanner;

const bannerImages: AdminHandleBannerRequestBanners[] = [
  {
    imageUrl: '/images/default-banner-1.png',
    title: '집에서 콘서트장까지 함께, 핸디버스와 함께',
    linkUrl: '/help/about',
    sequence: 1,
  },
  {
    imageUrl: '/images/default-banner-2.png',
    title: '핸디버스는 어떻게 이용해요?',
    linkUrl: '/help/how-to',
    sequence: 2,
  },
] as const;

const BannerItem = ({ image }: { image: AdminHandleBannerRequestBanners }) => (
  <Link key={image.title} href={image.linkUrl}>
    <div className="relative aspect-[375/161] w-[min(500px,100vw)]">
      <Image
        src={image.imageUrl}
        alt={image.title}
        fill
        className="object-cover"
        loading="eager"
        priority
      />
    </div>
  </Link>
);
