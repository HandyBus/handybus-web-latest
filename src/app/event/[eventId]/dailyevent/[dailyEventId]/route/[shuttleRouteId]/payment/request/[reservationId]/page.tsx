'use client';

import Button from '@/components/buttons/button/Button';
import usePreventScroll from '@/hooks/usePreventScroll';
import Link from 'next/link';
import SuccessBusIcon from '../icons/bus-success.svg';
import { useGetUserReservation } from '@/services/reservation.service';
import Loading from '@/components/loading/Loading';
import { HANDY_PARTY_PREFIX } from '@/constants/common';

interface Props {
  params: {
    eventId: string;
    reservationId: string;
  };
}

const PaymentsCompleted = ({ params }: Props) => {
  usePreventScroll();
  const { reservationId } = params;
  const { data, isLoading, isError } = useGetUserReservation(reservationId);

  if (isLoading) return <Loading />;
  if (isError) throw new Error('예약 정보를 불러오는데 실패했습니다.');

  const isHandyParty =
    data?.reservation.shuttleRoute.name.includes(HANDY_PARTY_PREFIX);
  const dailyEventId = data?.reservation.shuttleRoute.dailyEventId;
  const noticeRoomUrl = data?.reservation.shuttleRoute.event.dailyEvents.find(
    (dailyEvent) => dailyEvent.dailyEventId === dailyEventId,
  )?.metadata?.openChatUrl;

  if (isHandyParty) {
    return (
      <main className="relative grow">
        <section className="absolute left-1/2 top-180 flex -translate-x-1/2 flex-col items-center whitespace-nowrap break-keep">
          <h1 className="pb-4 text-22 font-700">셔틀 예약이 완료되었어요</h1>
          <p className="pb-24 text-16 font-500 text-basic-grey-600">
            마이페이지에서 예약을 확인할 수 있어요.
          </p>
          <SuccessBusIcon />
        </section>
        <div className="fixed bottom-0 left-0 right-0 mx-auto flex max-w-500 flex-col gap-8 p-16">
          <Link href={`/event/${params.eventId}`}>
            <Button>완료</Button>
          </Link>
        </div>
      </main>
    );
  }
  return (
    <>
      <main className="relative grow">
        <section className="absolute left-1/2 top-180 flex -translate-x-1/2 flex-col items-center whitespace-nowrap break-keep">
          <h1 className="pb-4 text-22 font-700">셔틀 예약이 완료되었어요</h1>
          <p className="pb-24 text-center text-16 font-500 text-basic-grey-600">
            탑승권은 마이페이지에서 확인할 수 있습니다.
            <br />
            모든 현장 안내는 공지방에서 전달드리니,
            <br />
            탑승 전 꼭 입장해 주세요.
          </p>
          <SuccessBusIcon />
        </section>
        <div className="fixed bottom-0 left-0 right-0 mx-auto flex max-w-500 flex-col gap-8 p-16">
          <Button
            variant="primary"
            size="large"
            onClick={() => {
              window.open(noticeRoomUrl, '_blank', 'noopener,noreferrer');
            }}
            disabled={!noticeRoomUrl}
          >
            공지방 입장하기
          </Button>
          <Link href={`/event/${params.eventId}`}>
            <Button variant="secondary">완료</Button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default PaymentsCompleted;
