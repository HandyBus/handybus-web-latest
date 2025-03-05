'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  getHandyStatusStyle,
  getReservationStatusStyle,
} from '../utils/status.util';
import { dateString } from '@/utils/dateString.util';
import {
  CANCEL_STATUS_TO_STRING,
  HANDY_STATUS_TO_STRING,
  RESERVATION_STATUS_TO_STRING,
  TRIP_STATUS_TO_STRING,
} from '@/constants/status';
import { ReservationsViewEntity } from '@/types/user-management.type';
import { DEFAULT_EVENT_IMAGE } from '@/constants/common';
import { SyntheticEvent } from 'react';

type ButtonColor = 'primary' | 'grey';

interface Props {
  reservation: ReservationsViewEntity;
  buttonText?: string;
  onButtonClick?: () => void;
  buttonDisabled?: boolean;
  buttonColor?: ButtonColor;
  subButtonText?: string;
  onSubButtonClick?: () => void;
  subButtonDisabled?: boolean;
  subButtonColor?: ButtonColor;
}

const ReservationCard = ({
  reservation,
  buttonText,
  onButtonClick,
  buttonDisabled = false,
  buttonColor = 'grey',
  subButtonText,
  onSubButtonClick,
  subButtonDisabled = false,
  subButtonColor = 'grey',
}: Props) => {
  const parsedReservationDate = dateString(reservation.createdAt);
  const parsedShuttleDate = (() => {
    const date = reservation.shuttleRoute.event.dailyEvents.find(
      (dailyEvent) =>
        dailyEvent.dailyEventId === reservation.shuttleRoute.dailyEventId,
    )?.date;
    if (!date) {
      return '';
    }
    return dateString(date);
  })();

  const reservationStatusText =
    RESERVATION_STATUS_TO_STRING[reservation.reservationStatus];
  const reservationStatusStyle = getReservationStatusStyle(
    reservation.reservationStatus,
  );
  const handyStatusText = HANDY_STATUS_TO_STRING[reservation.handyStatus];
  const handyStatusStyle = getHandyStatusStyle(reservation.handyStatus);
  const cancelStatusText = CANCEL_STATUS_TO_STRING[reservation.cancelStatus];

  return (
    <Link
      href={`/reservation/${reservation.shuttleRoute.eventId}?dailyEventId=${reservation.shuttleRoute.dailyEventId}&shuttleRouteId=${reservation.shuttleRoute.shuttleRouteId}`}
      className="flex w-full flex-col gap-12 p-16"
    >
      <div className="flex items-center gap-8 text-12">
        <div
          className={`h-[10px] w-[10px] rounded-full ${reservationStatusStyle.dot}`}
        />
        <span className={`font-600 ${reservationStatusStyle.text}`}>
          {reservationStatusText}
        </span>
        <span className="font-500 text-grey-500">
          {parsedReservationDate} 예약
        </span>
      </div>
      <div className="flex h-[130px] w-full gap-16">
        <div className="relative h-full w-92 shrink-0 overflow-hidden rounded-[8px]">
          <Image
            src={
              reservation.shuttleRoute.event.eventImageUrl ||
              DEFAULT_EVENT_IMAGE
            }
            alt="행사 포스터"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="line-clamp-1 pb-4 text-16 font-500 text-grey-900">
            [{reservation.shuttleRoute.name}]{' '}
            {reservation.shuttleRoute.event.eventName}
          </span>
          <span className="text-12 font-400 text-grey-900">
            {reservation.shuttleRoute.event.eventLocationName}
          </span>
          <span className="text-12 font-400 text-grey-900">
            {parsedShuttleDate}
          </span>
          <span className="flex gap-8 text-12 font-400 text-grey-500">
            <span>{TRIP_STATUS_TO_STRING[reservation.type]}</span>
            <span>{reservation.passengerCount}인</span>
          </span>
          <span className="pt-4 text-14 font-500 text-grey-900">
            {reservation.paymentAmount?.toLocaleString()}{' '}
            <span className="text-12">원</span>
          </span>
          <div className="flex gap-8 pt-4 text-12 font-600">
            {reservation.reservationStatus !== 'CANCEL' ? (
              reservation.handyStatus !== 'NOT_SUPPORTED' && (
                <span className={`${handyStatusStyle}`}>{handyStatusText}</span>
              )
            ) : (
              <span>{cancelStatusText}</span>
            )}
          </div>
        </div>
      </div>
      {(buttonText || subButtonText) && (
        <div className="flex gap-8">
          {buttonText && onButtonClick && (
            <Button
              text={buttonText}
              onClick={onButtonClick}
              disabled={buttonDisabled}
              color={buttonColor}
            />
          )}
          {subButtonText && onSubButtonClick && (
            <Button
              text={subButtonText}
              onClick={onSubButtonClick}
              disabled={subButtonDisabled}
              color={subButtonColor}
            />
          )}
        </div>
      )}
    </Link>
  );
};

export default ReservationCard;

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled: boolean;
  color: ButtonColor;
}

const Button = ({ text, onClick, disabled, color }: ButtonProps) => {
  const handleButtonClick = (e: SyntheticEvent) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button
      onClick={handleButtonClick}
      disabled={disabled}
      type="button"
      className={`flex h-40 w-full items-center justify-center rounded-full text-14 font-500 disabled:bg-grey-50 disabled:text-grey-300 ${color === 'primary' ? 'bg-primary-main text-white active:bg-primary-700' : 'bg-grey-50 text-grey-700 active:bg-grey-100'}`}
    >
      {text}
    </button>
  );
};
