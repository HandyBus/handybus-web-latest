'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

interface Props {
  id: number;
  data: {
    imageSrc: string;
    type: '신청' | '예약';
    title: string;
    location: string;
    date: string;
    route: string;
    shuttleType: '왕복' | '귀가행' | '콘서트행';
    passengerCount: number;
    status: '수요 확인 중' | '신청 마감' | '예약 모집 중' | '무산';
    price?: number;
    reservationDate?: string;
  };
  buttonText?: string;
}

const ShuttleCard = ({ id, data, buttonText }: Props) => {
  const router = useRouter();
  const handleDetailClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/mypage/shuttle/${id}`);
  };

  return (
    <Link
      href={`/shuttle-detail/${id}`}
      className="flex w-full flex-col gap-12 p-16"
    >
      <div className="flex items-center gap-8 text-12">
        <div
          className={`h-[10px] w-[10px] rounded-full ${STATUS_STYLE[data.status].dot}`}
        />
        <span className={`font-600 ${STATUS_STYLE[data.status].text}`}>
          {data.status}
        </span>
        <span className="font-500 text-grey-500">
          {data.reservationDate} {data.type}
        </span>
      </div>
      <div className="flex h-[110px] w-full gap-16">
        <div className="relative h-full w-80 overflow-hidden rounded-[8px]">
          <Image
            src={data.imageSrc}
            alt="행사 포스터"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="pb-4 text-16 font-500 text-grey-900">
            {data.title}
          </span>
          <span className="text-12 font-400 text-grey-900">
            {data.location}
          </span>
          <span className="text-12 font-400 text-grey-900">
            {data.date} 셔틀
          </span>
          <span className="flex gap-12 text-12 font-400 text-grey-500">
            <span>
              {data.route} ({data.shuttleType})
            </span>
            <span>{data.passengerCount}인</span>
          </span>
          {data?.price && (
            <span className="pt-4 text-14 font-500 text-grey-900">
              {data.price.toLocaleString()} <span className="text-12">원</span>
            </span>
          )}
        </div>
      </div>
      {buttonText && (
        <button
          onClick={handleDetailClick}
          type="button"
          className="flex h-40 w-full items-center justify-center rounded-full bg-grey-50 text-14 font-500 text-grey-700"
        >
          {buttonText}
        </button>
      )}
    </Link>
  );
};

export default ShuttleCard;

const STATUS_STYLE = {
  '예약 모집 중': {
    dot: 'bg-primary-main',
    text: 'text-primary-main',
  },
  '수요 확인 중': {
    dot: 'border-2 border-primary-main',
    text: 'text-primary-main',
  },
  '신청 마감': {
    dot: 'bg-grey-700',
    text: 'text-grey-700',
  },
  무산: {
    dot: 'bg-grey-500',
    text: 'text-grey-500',
  },
};
