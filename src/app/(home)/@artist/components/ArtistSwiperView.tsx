'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ArtistsViewEntity } from '@/types/artist.type';

interface Props {
  artists: ArtistsViewEntity[];
}

const ArtistSwiperView = ({ artists }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative -mx-16 w-[calc(100%+32px)]">
      <div
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <Swiper
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
  artist: ArtistsViewEntity;
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
  return (
    <Link
      href={`/artist/${artist.artistId}`}
      className="flex w-[97px] flex-col items-center gap-8"
    >
      <div className="aspect-square w-[97px] rounded-8 bg-basic-grey-100" />
      <span className="line-clamp-2 w-full text-center text-14 font-600 leading-[140%]">
        {artist.artistAbbreviatedName ?? artist.artistDisplayName}
      </span>
    </Link>
  );
};
