'use client';

import { useRef, useState } from 'react';
import type { SwiperRef } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useGetBanners } from '@/services/core.service';

const Banner = () => {
  const swiper = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: bannerImages, isLoading, error, isError } = useGetBanners();

  if (isLoading)
    return (
      <div className="flex aspect-[375/160] w-[min(500px,100vw)] items-center justify-center" />
    );
  if (isError) throw error;
  if (!bannerImages?.length) return null;
  return (
    <>
      <Swiper
        ref={swiper}
        pagination={true}
        className="relative bg-primary-main"
        onSlideChange={(sw) => setActiveIndex(sw?.activeIndex)}
      >
        {bannerImages.map((image) => (
          <SwiperSlide key={image.title} className="aspect-[375/160]">
            <BannerItem image={image} />
          </SwiperSlide>
        ))}
        <div className="pointer-events-none absolute bottom-[14px] left-[50%] z-50 flex -translate-x-[50%] flex-row gap-[6px]">
          {bannerImages
            .sort((a, b) => a.sequence - b.sequence)
            .map((image, index) => (
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

export default Banner;

import Image from 'next/image';
import Link from 'next/link';
import { AdminHandleBannerRequestBanners } from '@/types/banner.type';

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
