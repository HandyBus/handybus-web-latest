'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import Rating from '@/components/rating/Rating';
import ArtistIcon from '../icons/artist.svg';
import LocateIcon from '../icons/locate.svg';
import { DEFAULT_PROFILE_IMAGE } from '@/constants/common';
import { dateString } from '@/utils/dateString.util';
import { ReviewsViewEntity } from '@/types/review.type';
import { ArtistsViewEntity } from '@/types/artist.type';
interface Props {
  review: ReviewsViewEntity;
  showUser?: boolean;
  showCreatedAt?: boolean;
}

const DetailedReview = ({
  review,
  showUser = false,
  showCreatedAt = false,
}: Props) => {
  return (
    <article className="bg-basic-grey-50 flex flex-col rounded-[16px] p-16 px-28 py-28">
      <ContentArea rating={review.rating} content={review.content} />
      <div className="flex flex-col gap-12 pb-12 pt-16">
        <ImagesArea
          imageUrls={review.reviewImages?.map((image) => image.imageUrl) ?? []}
        />
        <div className="flex">
          {showUser && (
            <UserTag
              nickname={review.userNickname}
              profileImageUrl={review.userProfileImage ?? ''}
            />
          )}
          {showCreatedAt && (
            <span className="text-basic-grey-400 ml-auto block text-12 font-500">
              {dateString(review.createdAt)} 작성
            </span>
          )}
        </div>
      </div>
      <div className="border-t-basic-grey-100 flex flex-col gap-8 border-t-[1.5px] pt-8">
        <span className="text-basic-grey-700 text-14 font-600">
          다녀온 콘서트
        </span>
        <EventTag
          title={review.eventName}
          artists={review.eventArtists ?? []}
          location={review.eventLocationName}
          posterImageUrl={review.eventImageUrl}
        />
      </div>
    </article>
  );
};

export default DetailedReview;

interface ContentAreaProps {
  rating: number;
  content: string;
}

const ContentArea = ({ rating, content }: ContentAreaProps) => {
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
        className={`${useClamp ? 'line-clamp-2' : ''} text-basic-grey-600 overflow-hidden pt-12 text-16 font-500`}
      >
        {content}
      </p>
      {clamped && (
        <span
          aria-hidden={true}
          className="text-basic-grey-400 cursor-pointer text-12 font-500"
          onClick={() => setUseClamp((b) => !b)}
        >
          {useClamp ? '더 보기' : '접기'}
        </span>
      )}
    </div>
  );
};

interface ImagesAreaProps {
  imageUrls: string[];
}

const ImagesArea = ({ imageUrls }: ImagesAreaProps) => {
  if (imageUrls.length === 0) {
    return null;
  }

  return (
    <div className="flex snap-x flex-row gap-8 overflow-y-auto overflow-x-hidden">
      {imageUrls.map((imageUrl, idx) => (
        <figure
          key={idx}
          className="relative max-h-100 min-h-100 min-w-100 max-w-100 snap-start"
        >
          <Image
            src={imageUrl}
            alt="review"
            className="rounded-[20px] object-cover"
            fill
          />
        </figure>
      ))}
    </div>
  );
};

interface UserTagProps {
  nickname: string;
  profileImageUrl: string;
}

const UserTag = ({ nickname, profileImageUrl }: UserTagProps) => (
  <div className="flex items-center gap-[6px]">
    <div className="relative h-[16.5px] w-[16.5px] overflow-hidden rounded-full">
      <Image
        className="object-cover"
        src={profileImageUrl || DEFAULT_PROFILE_IMAGE}
        alt={`${nickname}의 프로필 이미지`}
        fill
      />
    </div>
    <span className="text-basic-grey-500 text-12 font-500">{nickname}</span>
  </div>
);

interface EventTagProps {
  title: string;
  artists: ArtistsViewEntity[];
  location: string;
  posterImageUrl: string;
}

const EventTag = ({
  title,
  artists,
  location,
  posterImageUrl,
}: EventTagProps) => (
  <div className="relative h-[97px] overflow-hidden rounded-[12px] text-basic-white">
    <Image
      className="object-cover"
      src={posterImageUrl}
      alt="행사 포스터"
      fill
    />
    <div className="absolute left-0 top-0 flex h-full w-full flex-col items-start justify-between bg-basic-black bg-opacity-50 p-12">
      <div className="line-clamp-2 text-14 font-700 text-basic-white">
        {title}
      </div>
      <div className="flex flex-row flex-nowrap gap-12">
        {artists.length !== 0 && (
          <div className="flex flex-row items-center justify-start gap-4">
            <ArtistIcon />
            <span className="text-basic-grey-200 line-clamp-1 text-10 font-400 ">
              {artists.map((artist) => artist.artistName).join(', ')}
            </span>
          </div>
        )}
        <div className="flex flex-row items-center justify-start gap-4">
          <LocateIcon />
          <span className="text-basic-grey-200 line-clamp-1 text-10 font-400 ">
            {location}
          </span>
        </div>
      </div>
    </div>
  </div>
);
