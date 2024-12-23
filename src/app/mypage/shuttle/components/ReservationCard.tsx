'use client';

import { ReservationType } from '@/types/client.types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import {
  CANCEL_STATUS_TEXT,
  HANDY_STATUS_TEXT,
  RESERVATION_STATUS_TEXT,
  TRIP_TEXT,
} from '../shuttle.constants';
import { getStatusStyle } from '../shuttle.utils';
import { parseDateString } from '@/utils/dateString';

interface Props {
  reservation: ReservationType;
  buttonText?: string;
  buttonHref?: string;
  buttonDisabled?: boolean;
  subButtonText?: string;
  subButtonHref?: string;
  subButtonDisabled?: boolean;
}

const ReservationCard = ({
  reservation,
  buttonText,
  buttonHref,
  buttonDisabled,
  subButtonText,
  subButtonHref,
  subButtonDisabled,
}: Props) => {
  const router = useRouter();
  const handleButtonClick =
    (href: string) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      router.push(href);
    };

  const parsedDate = parseDateString(reservation.createdAt);
  const status = RESERVATION_STATUS_TEXT[reservation.shuttle.route.status];
  const statusStyle = getStatusStyle(status);
  const handyStatus = HANDY_STATUS_TEXT[reservation.handyStatus];
  const cancelStatus = CANCEL_STATUS_TEXT[reservation.cancelStatus];
  return (
    <Link
      href={`/shuttle-detail/${reservation.id}`}
      className="flex w-full flex-col gap-12 p-16"
    >
      <div className="flex items-center gap-8 text-12">
        <div className={`h-[10px] w-[10px] rounded-full ${statusStyle.dot}`} />
        <span className={`font-600 ${statusStyle.text}`}>{status}</span>
        <span className="font-500 text-grey-500">{parsedDate} 예약</span>
      </div>
      <div className="flex h-[130px] w-full gap-16">
        <div className="relative h-full w-80 overflow-hidden rounded-[8px]">
          <Image
            src={reservation.shuttle.image}
            alt="행사 포스터"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="pb-4 text-16 font-500 text-grey-900">
            {reservation.shuttle.name}
          </span>
          <span className="text-12 font-400 text-grey-900">
            {reservation.shuttle.destination.name}
          </span>
          <span className="text-12 font-400 text-grey-900">
            {reservation.shuttle.date} 셔틀
          </span>
          <span className="flex gap-12 text-12 font-400 text-grey-500">
            <span>
              {reservation.shuttle.route.name} ({TRIP_TEXT[reservation.type]})
            </span>
            <span>{reservation.passengers.length}인</span>
          </span>
          <span className="pt-4 text-14 font-500 text-grey-900">
            {/* TODO: 결제 연동된 이후에 주석 해제 */}
            {/* {reservation.payment.paymentAmount.toLocaleString()}{' '} */}
            <span className="text-12">원</span>
          </span>
          <div className="flex gap-8 pt-4">
            {handyStatus && (
              <div className="rounded-full border border-grey-400 px-4 text-10 text-grey-500">
                {handyStatus}
              </div>
            )}
            {cancelStatus && (
              <div className="rounded-full border border-grey-400 px-4 text-10 text-grey-500">
                {cancelStatus}
              </div>
            )}
          </div>
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
          {subButtonText && subButtonHref && (
            <button
              onClick={handleButtonClick(subButtonHref)}
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

export default ReservationCard;
