'use client';

import Button from '@/components/buttons/button/Button';
import usePreventScroll from '@/hooks/usePreventScroll';
import Link from 'next/link';
import { useState } from 'react';
import SuccessBusIcon from '../icons/bus-success.svg';
import FeedbackScreen from '@/components/feedback/FeedbackScreen';

interface Props {
  params: {
    eventId: string;
    reservationId: string;
  };
}

const PaymentsCompleted = ({ params }: Props) => {
  usePreventScroll();

  const [showFeedbackScreen, setShowFeedbackScreen] = useState(false);
  if (showFeedbackScreen) {
    return (
      <FeedbackScreen
        subject="예약 - 성공"
        closeFeedbackScreen={() => setShowFeedbackScreen(false)}
      />
    );
  }

  const { reservationId } = params;

  return (
    <>
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
          <Button
            variant="secondary"
            size="large"
            onClick={() => {
              window.open(
                `/mypage/boarding-pass?reservationId=${reservationId}`,
                '_blank',
                'noopener,noreferrer',
              );
            }}
          >
            탑승권 확인하기
          </Button>
        </div>
      </main>
    </>
  );
};

export default PaymentsCompleted;
