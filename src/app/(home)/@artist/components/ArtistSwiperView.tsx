'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperRef } from 'swiper/react';
import 'swiper/css';
interface Artist {
  artistId: string;
  artistName: string;
}

interface Props {
  artists: Artist[];
}

const ArtistSwiperView = ({ artists }: Props) => {
  const swiper = useRef<SwiperRef>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
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
          {artists.map((artist) => (
            <SwiperSlide key={artist.artistId} style={{ width: 'auto' }}>
              <div className="pr-8">
                <ArtistCard artist={artist} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ArtistSwiperView;

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
  return (
    <Link
      href={`/artist/${artist.artistId}`}
      className="flex w-[97px] flex-col items-center gap-8"
    >
      <div className="aspect-square w-[97px] rounded-8 bg-basic-grey-100" />
      <span className="line-clamp-2 w-full text-center text-14 font-600 leading-[140%]">
        {artist.artistName}
      </span>
    </Link>
  );
};
