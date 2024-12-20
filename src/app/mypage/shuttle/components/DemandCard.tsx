'use client';

import { ID_TO_REGION } from '@/constants/regions';
import { ShuttleDemandType } from '@/types/client.types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import {
  DEMAND_STATUS_TEXT,
  STATUS_STYLE,
  StatusType,
  TRIP_TEXT,
} from '../constants/shuttle.constants';

interface Props {
  demand: ShuttleDemandType;
  buttonText?: string;
  buttonHref?: string;
  buttonDisabled?: boolean;
  subButtonText?: string;
  subButtonHref?: string;
  subButtonDisabled?: boolean;
  subButtonOnClick?: () => void;
}

const DemandCard = ({
  demand,
  buttonText,
  buttonHref,
  buttonDisabled,
  subButtonText,
  subButtonHref,
  subButtonDisabled,
  subButtonOnClick,
}: Props) => {
  const router = useRouter();
  const handleButtonClick =
    (href: string) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      router.push(href);
    };

  const getStatusStyle = (status: StatusType) => {
    switch (status) {
      case '수요 확인 중':
      case '예약 모집 중':
      case '배차 확정':
        return STATUS_STYLE.fullGreen;
      case '수요 신청 마감':
      case '예약 모집 마감':
        return STATUS_STYLE.emptyGreen;
      case '운행 종료':
      case '무산':
        return STATUS_STYLE.darkGrey;
      case '무산':
      case '비활성':
        return STATUS_STYLE.lightGrey;
    }
  };

  const region = ID_TO_REGION[demand.regionID];
  const routeText = `${region.bigRegion} ${region.smallRegion} (${TRIP_TEXT[demand.type]})`;
  const status = DEMAND_STATUS_TEXT[demand.status];
  const statusStyle = getStatusStyle(status);

  return (
    <Link
      href={`/shuttle-detail/${demand.shuttle.id}`}
      className="flex w-full flex-col gap-12 p-16"
    >
      <div className="flex items-center gap-8 text-12">
        <div className={`h-[10px] w-[10px] rounded-full ${statusStyle.dot}`} />
        <span className={`font-600 ${statusStyle.text}`}>{status}</span>
        <span className="font-500 text-grey-500">{demand.createdAt} 신청</span>
      </div>
      <div className="flex h-[130px] w-full gap-16">
        <div className="relative h-full w-80 overflow-hidden rounded-[8px]">
          <Image
            src={demand.shuttle.image}
            alt="행사 포스터"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="pb-4 text-16 font-500 text-grey-900">
            {demand.shuttle.name}
          </span>
          <span className="text-12 font-400 text-grey-900">
            {demand.shuttle.destination.name}
          </span>
          <span className="text-12 font-400 text-grey-900">
            {demand.shuttle.date} 셔틀
          </span>
          <span className="flex gap-12 text-12 font-400 text-grey-500">
            <span>{routeText}</span>
            <span>{demand.passengerCount}인</span>
          </span>
        </div>
      </div>
      {(buttonText || subButtonText) && (
        <div className="flex gap-8">
          {buttonText && buttonHref && (
            <button
              onClick={handleButtonClick(buttonHref)}
              disabled={buttonDisabled}
              type="button"
              className="flex h-40 w-full items-center justify-center rounded-full bg-primary-main text-14 font-500 text-white active:bg-primary-700 disabled:bg-grey-50 disabled:text-grey-300"
            >
              {buttonText}
            </button>
          )}
          {subButtonText && (
            <button
              onClick={
                subButtonOnClick ||
                (subButtonHref ? handleButtonClick(subButtonHref) : undefined)
              }
              disabled={subButtonDisabled}
              type="button"
              className="flex h-40 w-full items-center justify-center rounded-full bg-grey-50 text-14 font-500 text-grey-700 disabled:bg-grey-50 disabled:text-grey-300"
            >
              {subButtonText}
            </button>
          )}
        </div>
      )}
    </Link>
  );
};

export default DemandCard;
