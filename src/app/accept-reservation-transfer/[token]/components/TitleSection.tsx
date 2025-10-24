'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Badge from '@/components/badge/Badge';
import GiftIcon from '../icons/gift.svg';
import ForbiddenIcon from '../icons/forbidden.svg';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { ReservationTransferRequestsEntity } from '@/types/reservationTransferRequest.type';
import { customTwMerge } from 'tailwind.config';

interface Props {
  reservation: ReservationsViewEntity;
  reservationTransferRequest: ReservationTransferRequestsEntity;
}

const TitleSection = ({ reservation, reservationTransferRequest }: Props) => {
  const senderName = reservation.userName || reservation.userNickname;
  const [remainingTime, setRemainingTime] = useState<string>(
    getRemainingTime(reservationTransferRequest.expiresAt),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(getRemainingTime(reservationTransferRequest.expiresAt));
    }, 1000);

    return () => clearInterval(timer);
  }, [reservationTransferRequest.expiresAt]);

  const isPending = reservationTransferRequest.status === 'PENDING';
  const isExpired = remainingTime === '수락 시간 종료';

  return (
    <>
      <div className="flex items-center justify-center pt-8">
        <Badge
          className={customTwMerge(
            'w-fit bg-basic-red-100 text-basic-red-400',
            isExpired && 'bg-basic-grey-50 text-basic-grey-500',
          )}
        >
          {remainingTime}
        </Badge>
      </div>
      <section className="flex flex-col gap-16 px-16 pb-8 pt-12">
        {isPending ? <GiftIcon /> : <ForbiddenIcon />}
        {isPending ? (
          <h1 className="text-18 font-600 leading-[140%]">
            {senderName}님께서
            <br />
            탑승권을 보냈어요
          </h1>
        ) : (
          <div>
            <h1 className="pb-4 text-18 font-600 leading-[140%]">
              탑승권을
              <br />
              수락할 수 없어요
            </h1>
            <p className="text-14 font-500 leading-[160%] text-basic-grey-600">
              {isExpired
                ? '수락 가능 시간이 만료되어 발신자에게 반환되었어요.'
                : '발신자가 선물하기를 취소했어요.'}
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default TitleSection;

const getRemainingTime = (expiresAt: string) => {
  const now = dayjs();
  const expiryTime = dayjs(expiresAt);
  const difference = expiryTime.diff(now);

  if (difference <= 0) {
    return '수락 시간 종료';
  }

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return `${hours}시간 ${minutes}분 ${seconds}초 남음`;
};
