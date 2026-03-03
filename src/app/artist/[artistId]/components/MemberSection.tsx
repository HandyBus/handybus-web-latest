'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperRef } from 'swiper/react';
import 'swiper/css';
import { ArtistsInArtistViewEntity } from '@/types/artist.type';

interface Props {
  members: ArtistsInArtistViewEntity[];
}

const MemberSection = ({ members }: Props) => {
  const swiper = useRef<SwiperRef>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="px-16 py-24">
      <h3 className="pb-16 text-18 font-700 leading-[140%]">
        멤버
        <span className="ml-8 text-14 font-500 leading-[140%] text-basic-grey-500">
          {members.length}명
        </span>
      </h3>
      <div className="relative -mx-16 w-[calc(100%+32px)]">
        <div
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <Swiper
            ref={swiper}
            slidesPerView="auto"
            className="relative w-full"
            onInit={() => setIsLoaded(true)}
          >
            <SwiperSlide style={{ width: 'auto' }}>
              <div className="w-16" />
            </SwiperSlide>
            {members.map((member) => (
              <SwiperSlide key={member.artistId} style={{ width: 'auto' }}>
                <div className="pr-8">
                  <Link
                    href={`/artist/${member.artistId}`}
                    className="flex w-[80px] flex-col items-center gap-4"
                  >
                    <div className="aspect-square w-[80px] rounded-8 bg-basic-grey-100" />
                    <span className="line-clamp-2 w-full text-center text-12 font-500 leading-[160%]">
                      {member.artistName}
                    </span>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default MemberSection;
