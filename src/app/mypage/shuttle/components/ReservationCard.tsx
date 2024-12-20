'use client';

import { ReservationType } from '@/types/client.types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import {
  RESERVATION_STATUS_TEXT,
  TRIP_TEXT,
} from '../constants/shuttle.constants';
import { STATUS_STYLE, StatusType } from '../constants/shuttle.constants';

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

  const status = RESERVATION_STATUS_TEXT[reservation.shuttle.route.status];
  const statusStyle = getStatusStyle(status);

  return (
    <Link
      href={`/shuttle-detail/${reservation.id}`}
      className="flex w-full flex-col gap-12 p-16"
    >
      <div className="flex items-center gap-8 text-12">
        <div className={`h-[10px] w-[10px] rounded-full ${statusStyle.dot}`} />
        <span className={`font-600 ${statusStyle.text}`}>{status}</span>
        <span className="font-500 text-grey-500">
          {reservation.createdAt} 예약
        </span>
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
            {/* TODO: 승객 수 추가 */}
            <span>{2}인</span>
          </span>
          <span className="pt-4 text-14 font-500 text-grey-900">
            {reservation.payment.paymentAmount.toLocaleString()}{' '}
            <span className="text-12">원</span>
          </span>
          <div className="flex gap-8 pt-4">
            {/* TODO: 핸디 신청 상태 & 환불 신청 상태를 tag로 보여주기 */}
            <div className="rounded-full border border-grey-400 px-4 text-10 text-grey-500">
              핸디 지원
            </div>
            <div className="rounded-full border border-grey-400 px-4 text-10 text-grey-500">
              환불 진행 중
            </div>
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
