'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import Rating from '@/components/rating/Rating';
import { ReviewType } from '@/types/review.types';

interface Props {
  review: ReviewType;
}

const DetailedReview = ({ review }: Props) => {
  return (
    <article className="flex flex-col rounded-[16px] bg-grey-50 p-16 px-28 py-28">
      <ContentArea review={review} />
      <div className="flex flex-col gap-12 pb-12 pt-16">
        <ImagesArea images={review.images} />
        <UserTag user={review.user} />
      </div>
      <div className="flex flex-col gap-8 border-t-[1.5px] border-t-grey-100 pt-8">
        <span className="text-14 font-600 text-grey-700">다녀온 콘서트</span>
        <ConcertTag concert={review.concert} />
      </div>
    </article>
  );
};

export default DetailedReview;

const ContentArea = ({ review }: Props) => {
  const { rating, content } = review;
  const [clamped, setClamped] = useState(false);
  const [useClamp, setUseClamp] = useState(true);

  const prevWidth = useRef(0);

  const ref = useCallback(
    (node: HTMLParagraphElement | null) => {
      if (node !== null) {
        const resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            if (entry.target.clientWidth === prevWidth.current) continue;
            if (!useClamp) continue;
            prevWidth.current = entry.target.clientWidth;
            setClamped(entry.target.scrollHeight > entry.target.clientHeight);
          }
        });
        resizeObserver.observe(node);

        return () => {
          resizeObserver.unobserve(node);
        };
      }
    },
    [useClamp],
  );

  return (
    <div className="flex flex-col">
      <Rating size="medium" value={rating} />
      <p
        ref={ref}
        className={`${useClamp ? 'line-clamp-2' : ''} overflow-hidden pt-12 text-16 font-500 text-grey-600-sub`}
      >
        {content}
      </p>
      {clamped && (
        <span
          aria-hidden={true}
          className="cursor-pointer text-12 font-500 text-grey-400"
          onClick={() => setUseClamp((b) => !b)}
        >
          {useClamp ? '더 보기' : '접기'}
        </span>
      )}
    </div>
  );
};

const ImagesArea = ({ images }: Pick<ReviewType, 'images'>) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="flex snap-x flex-row gap-8 overflow-scroll">
      {images.map((image, idx) => (
        <figure
          key={idx}
          className="relative max-h-100 min-h-100 min-w-100 max-w-100 snap-start"
        >
          <Image
            src={image.imageUrl}
            alt="review"
            className="rounded-[20px] object-cover"
            fill
          />
        </figure>
      ))}
    </div>
  );
};

const UserTag = ({ user }: Pick<ReviewType, 'user'>) => (
  <div className="flex flex-row items-center justify-start gap-[6px]">
    <div className="relative h-[16.5px] w-[16.5px] overflow-hidden rounded-full bg-red-200">
      <Image
        className="object-cover"
        src={user.profileImageUrl}
        alt={`${user.nickname}의 프로필 이미지`}
        fill
      />
    </div>
    <span className="text-12 font-500 text-grey-500">{user.nickname}</span>
  </div>
);

const ConcertTag = ({ concert }: Pick<ReviewType, 'concert'>) => (
  <div className="relative h-[97px] overflow-hidden rounded-[12px] text-white">
    <Image
      className="object-cover"
      src={concert.posterImageUrl}
      alt="concert"
      fill
    />
    <div className="absolute left-0 top-0 flex h-full w-full flex-col items-start justify-between bg-black bg-opacity-50 p-12">
      <div className="line-clamp-2 text-14 font-700 text-white">
        {concert.title}
      </div>
      <div className="flex flex-row flex-nowrap gap-12">
        <ArtistTag artist={concert.artist} />
        <LocationTag locate={concert.location} />
      </div>
    </div>
  </div>
);

import ArtistIcon from '../icons/artist.svg';
import LocateIcon from '../icons/locate.svg';

const ArtistTag = ({ artist }: { artist: string }) => (
  <div className="flex flex-row items-center justify-start gap-4">
    <ArtistIcon />
    <span className="line-clamp-1 text-10 font-400 text-grey-200 ">
      {artist}
    </span>
  </div>
);
const LocationTag = ({ locate }: { locate: string }) => (
  <div className="flex flex-row items-center justify-start gap-4">
    <LocateIcon />
    <span className="line-clamp-1 text-10 font-400 text-grey-200 ">
      {locate}
    </span>
  </div>
);