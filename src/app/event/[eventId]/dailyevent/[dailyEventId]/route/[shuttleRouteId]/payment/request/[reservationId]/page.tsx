'use client';

import Button from '@/components/buttons/button/Button';
import usePreventScroll from '@/hooks/usePreventScroll';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { setReservationCompleted } from '@/utils/localStorage';
import SuccessBusIcon from '../icons/bus-success.svg';
import FeedbackScreen from '@/app/event/[eventId]/components/FeedbackScreen';

interface Props {
  params: {
    eventId: string;
  };
}

const PaymentsCompleted = ({ params }: Props) => {
  usePreventScroll();

  useEffect(() => {
    setReservationCompleted();
  }, []);

  const [showFeedbackScreen, setShowFeedbackScreen] = useState(false);
  if (showFeedbackScreen) {
    return (
      <FeedbackScreen
        closeFeedbackScreen={() => setShowFeedbackScreen(false)}
      />
    );
  }

  return (
    <>
      <main className="relative grow">
        <section className="absolute left-1/2 top-180 flex -translate-x-1/2 flex-col items-center gap-24 whitespace-nowrap break-keep">
          <h1 className="text-22 font-700">셔틀 예약이 완료되었어요</h1>
          <SuccessBusIcon />
        </section>
        <div className="fixed bottom-0 left-0 right-0 mx-auto flex max-w-500 flex-col gap-8 p-16">
          <Link href={`/event/${params.eventId}`}>
            <Button>완료</Button>
          </Link>
          <Button
            variant="text"
            size="large"
            onClick={() => setShowFeedbackScreen(true)}
          >
            의견 보내기
          </Button>
        </div>
      </main>
    </>
  );
};

export default PaymentsCompleted;
