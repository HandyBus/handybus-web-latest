'use client';

import { ID_TO_REGION } from '@/constants/regions';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEvent, MouseEventHandler } from 'react';
import { dateString } from '@/utils/dateString.util';
import { DEMAND_STATUS_TO_STRING } from '@/constants/status';
import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import { ShuttleDemandsViewEntity } from '@/types/user-management.type';
import { DEFAULT_EVENT_IMAGE } from '@/constants/common';
import { getDemandStatusStyle } from '../utils/status.util';

interface Props {
  demand: ShuttleDemandsViewEntity;
  href?: string;
  buttonText?: string;
  buttonHref?: string;
  buttonDisabled?: boolean;
  subButtonText?: string;
  subButtonHref?: string;
  subButtonDisabled?: boolean;
  subButtonOnClick?: MouseEventHandler<HTMLButtonElement>;
}

const DemandCard = ({
  demand,
  href,
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

  const parsedDemandDate = dateString(demand.createdAt);
  const parsedDailyEventDate = dateString(
    demand.event.dailyEvents.find(
      (dailyEvent) => dailyEvent.dailyEventId === demand.dailyEventId,
    )?.date,
  );
  const region = ID_TO_REGION[demand.regionId];
  const routeText = `${region.bigRegion} ${region.smallRegion} (${TRIP_STATUS_TO_STRING[demand.type]})`;
  const status = DEMAND_STATUS_TO_STRING[demand.status];
  const statusStyle = getDemandStatusStyle(demand.status);

  return (
    <Link
      href={href || `/demand/${demand.eventId}`}
      className="flex w-full flex-col gap-12 p-16"
    >
      <div className="flex items-center gap-8 text-12">
        <div className={`h-[10px] w-[10px] rounded-full ${statusStyle.dot}`} />
        <span className={`font-600 ${statusStyle.text}`}>{status}</span>
        <span className="font-500 text-grey-500">{parsedDemandDate} 신청</span>
      </div>
      <div className="flex h-[130px] w-full gap-16">
        <div className="relative h-full w-92 shrink-0 overflow-hidden rounded-[8px]">
          <Image
            src={demand.event.eventImageUrl || DEFAULT_EVENT_IMAGE}
            alt="행사 포스터"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="pb-4 text-16 font-500 text-grey-900">
            {demand.event.eventName}
          </span>
          <span className="text-12 font-400 text-grey-900">
            {demand.event.eventLocationName}
          </span>
          <span className="text-12 font-400 text-grey-900">
            {parsedDailyEventDate} 셔틀
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
