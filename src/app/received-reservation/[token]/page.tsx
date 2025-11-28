'use client';

import Button from '@/components/buttons/button/Button';
import {
  getReservationTransferRequestWithToken,
  usePostAcceptReservationTransferRequest,
} from '@/services/reservationTransferRequest.service';
import { getIsLoggedIn } from '@/utils/handleToken.util';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { ReservationTransferRequestsEntity } from '@/types/reservationTransferRequest.type';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useState } from 'react';
import { useFlow } from '@/stacks';

interface Props {
  params: {
    token: string;
  };
}

const Page = ({ params }: Props) => {
  const { token } = params;
  const [reservation, setReservation] = useState<ReservationsViewEntity | null>(
    null,
  );
  const [reservationTransferRequest, setReservationTransferRequest] =
    useState<ReservationTransferRequestsEntity | null>(null);
  const { mutateAsync: postAcceptReservationTransferRequest } =
    usePostAcceptReservationTransferRequest();

  const flow = useFlow();

  const loadReservationTransferRequest = useCallback(async () => {
    const isLoggedIn = getIsLoggedIn();
    if (!isLoggedIn) {
      flow.push(
        'Login',
        { redirectUrl: `/received-reservation/${token}` },
        { animate: false },
      );
      return;
    }
    const res = await getReservationTransferRequestWithToken(token);
    setReservation(res.reservation);
    setReservationTransferRequest(res.reservationTransferRequest);
  }, [token, flow]);

  useEffect(() => {
    loadReservationTransferRequest();
  }, [loadReservationTransferRequest]);

  const handleAcceptReservationTransferRequest = async (token: string) => {
    try {
      await postAcceptReservationTransferRequest(token);
      toast.success('예약을 수락했어요.');
      flow.replace('History', { type: 'reservation' }, { animate: false });
    } catch (error) {
      console.error(error);
      toast.error('잠시 후 다시 시도해주세요.');
    }
  };

  if (!reservation || !reservationTransferRequest) {
    return null;
  }

  const dailyEvent = reservation.shuttleRoute.event.dailyEvents.find(
    (dailyEvent) =>
      dailyEvent.dailyEventId === reservation.shuttleRoute.dailyEventId,
  );

  return (
    <main className="flex grow flex-col items-center justify-center">
      <h1 className="text-22 font-700">선물 받은 예약이 있어요!</h1>
      <p className="text-16 font-500">
        행사명: {reservation.shuttleRoute.event.eventName}
      </p>
      <p className="text-16 font-500">
        행사 날짜:{' '}
        {dayjs(dailyEvent?.date).tz('Asia/Seoul').format('YYYY-MM-DD')}
      </p>
      <p className="text-16 font-500">
        노선명: {reservation.shuttleRoute.name}
      </p>
      <p className="text-16 font-500">
        받는 사람: {reservationTransferRequest.receiverPhoneNumber}
      </p>
      <Button
        variant="primary"
        size="medium"
        onClick={() => handleAcceptReservationTransferRequest(token)}
      >
        수락하기
      </Button>
    </main>
  );
};

export default Page;
