'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperRef } from 'swiper/react';
import 'swiper/css';
import Tooltip from '@/components/tooltip/Tooltip';
import { ArtistsViewEntity } from '@/types/artist.type';

interface Props {
  favoriteArtists: ArtistsViewEntity[] | null;
}

const FavoriteArtists = ({ favoriteArtists }: Props) => {
  const hasFavoriteArtists =
    favoriteArtists !== null && favoriteArtists.length > 0;

  return (
    <>
      <div className="h-[8px] bg-basic-grey-50" />
      <section className="p-16">
        <div className="mb-16 flex items-center">
          <h3 className="text-18 font-700 leading-[140%]">내 아티스트</h3>
          <Tooltip
            content="원하는 아티스트를 추가하면 공연 소식을 빠르게 받아볼 수 있는 기능입니다."
            position="right"
          />
        </div>
        {hasFavoriteArtists ? (
          <ArtistList favoriteArtists={favoriteArtists} />
        ) : (
          <EmptyState />
        )}
      </section>
      <div className="h-[8px] bg-basic-grey-50" />
    </>
  );
};

export default FavoriteArtists;

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center gap-12 py-12">
      <p className="text-14 font-500 leading-[160%] text-basic-grey-400">
        최애를 추가하고, 공연 소식을 받아보세요!
      </p>
      <Link
        href="/artist"
        className="rounded-8 bg-brand-primary-400 p-8 text-14 font-600 text-basic-white active:bg-brand-primary-500"
      >
        추가하기
      </Link>
    </div>
  );
};

interface ArtistListProps {
  favoriteArtists: ArtistsViewEntity[];
}

const ArtistList = ({ favoriteArtists }: ArtistListProps) => {
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
          {favoriteArtists.map((artist) => (
            <SwiperSlide key={artist.artistId} style={{ width: 'auto' }}>
              <div className="pr-8">
                <ArtistCard artist={artist} />
              </div>
            </SwiperSlide>
          ))}
          <SwiperSlide style={{ width: 'auto' }}>
            <div className="pr-16">
              <AddArtistCard />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

interface ArtistCardProps {
  artist: ArtistsViewEntity;
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
  return (
    <Link
      href={`/artist/${artist.artistId}`}
      className="flex w-[68.6px] flex-col items-center gap-8"
    >
      <div className="aspect-square w-[68.6px] rounded-8 bg-basic-grey-200" />
      <span className="w-full truncate text-center text-12 font-500 leading-[160%]">
        {artist.artistName}
      </span>
    </Link>
  );
};

const AddArtistCard = () => {
  return (
    <Link
      href="/artist"
      className="flex w-[68.6px] flex-col items-center gap-4"
    >
      <div className="flex aspect-square w-[68.6px] items-center justify-center rounded-8 bg-basic-grey-50">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5V19M5 12H19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-brand-primary-400"
          />
        </svg>
      </div>
      <span className="w-full truncate text-center text-12 font-500 text-basic-grey-500">
        추가하기
      </span>
    </Link>
  );
};
