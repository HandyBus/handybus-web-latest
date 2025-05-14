'use client';

import { useCallback, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Rating from '@/components/rating/Rating';
import ArtistIcon from '../icons/artist.svg';
import LocateIcon from '../icons/locate.svg';

interface Props {
  review: {
    id: number;
    rating: number;
    content: string;
    reviewImages: StaticImageData[];
    createdAt: string;
    userNickname: string;
    eventName: string;
    eventLocationName: string;
    eventImage: StaticImageData;
    eventArtists: string[];
  };
}

const DetailedStaticReview = ({ review }: Props) => {
  return (
    <article className="flex flex-col rounded-16 bg-basic-grey-50 p-16 px-28 py-28">
      <ContentArea rating={review.rating} content={review.content} />
      <div className="flex flex-col gap-12 pb-12 pt-16">
        <ImagesArea images={review.reviewImages ?? []} />
        <div className="flex">
          <UserTag nickname={review.userNickname} />
        </div>
      </div>
      <div className="flex flex-col gap-8 border-t-[1.5px] border-t-basic-grey-100 pt-8">
        <span className="text-14 font-600 text-basic-grey-700">
          다녀온 콘서트
        </span>
        <EventTag
          title={review.eventName}
          artists={review.eventArtists ?? []}
          location={review.eventLocationName}
          posterImage={review.eventImage}
        />
      </div>
    </article>
  );
};

export default DetailedStaticReview;

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
        className={`${useClamp ? 'line-clamp-2' : ''} overflow-hidden pt-12 text-16 font-500 text-basic-grey-600`}
      >
        {content}
      </p>
      {clamped && (
        <span
          aria-hidden={true}
          className="cursor-pointer text-12 font-500 text-basic-grey-400"
          onClick={() => setUseClamp((b) => !b)}
        >
          {useClamp ? '더 보기' : '접기'}
        </span>
      )}
    </div>
  );
};

interface ImagesAreaProps {
  images: StaticImageData[];
}

const ImagesArea = ({ images }: ImagesAreaProps) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="flex snap-x flex-row gap-8 overflow-y-auto overflow-x-hidden">
      {images.map((image, idx) => (
        <figure
          key={idx}
          className="relative max-h-100 min-h-100 min-w-100 max-w-100 snap-start"
        >
          <Image
            src={image}
            alt="review"
            className="rounded-20 object-cover"
            fill
          />
        </figure>
      ))}
    </div>
  );
};

interface UserTagProps {
  nickname: string;
}

const UserTag = ({ nickname }: UserTagProps) => (
  <div className="flex items-center gap-[6px]">
    <span className="text-12 font-500 text-basic-grey-500">{nickname}</span>
  </div>
);

interface EventTagProps {
  title: string;
  artists: string[];
  location: string;
  posterImage: StaticImageData;
}

const EventTag = ({ title, artists, location, posterImage }: EventTagProps) => (
  <div className="relative h-[97px] overflow-hidden rounded-12 text-basic-white">
    <Image className="object-cover" src={posterImage} alt="행사 포스터" fill />
    <div className="absolute left-0 top-0 flex h-full w-full flex-col items-start justify-between bg-basic-black bg-opacity-50 p-12">
      <div className="line-clamp-2 text-14 font-700 text-basic-white">
        {title}
      </div>
      <div className="flex flex-row flex-nowrap gap-12">
        {artists.length !== 0 && (
          <div className="flex flex-row items-center justify-start gap-4">
            <ArtistIcon />
            <span className="line-clamp-1 text-10 font-400 text-basic-grey-200 ">
              {artists.join(', ')}
            </span>
          </div>
        )}
        <div className="flex flex-row items-center justify-start gap-4">
          <LocateIcon />
          <span className="line-clamp-1 text-10 font-400 text-basic-grey-200 ">
            {location}
          </span>
        </div>
      </div>
    </div>
  </div>
);
