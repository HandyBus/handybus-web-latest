'use client';

import AppBar from '@/components/app-bar/AppBar';
import RefundPolicy from '../components/RefundPolicy';
import { CancellationAndRefundContent } from '@/components/notice-section/NoticeSection';
import Button from '@/components/buttons/button/Button';
import ConfirmModal from '@/components/modals/confirm/ConfirmModal';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Section from '../components/Section';
import ReservationCard from '../../components/ReservationCard';
import Loading from '@/components/loading/Loading';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import { useGetUserReservation } from '@/services/user-management.service';
import { usePostRefund } from '@/services/billing.service';

const REFUND_DDAY_TIME_LIMIT = 24 * 60 * 60 * 1000; // 24시간
const REFUND_DAY_LIMIT = 5; // 5일

interface Props {
  params: {
    id: string;
  };
}

const Refund = ({ params }: Props) => {
  const { id } = params;
  const { data, isLoading, isSuccess } = useGetUserReservation(Number(id));

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: postRefund, isPending } = usePostRefund(
    data?.reservation.paymentId ?? '',
    '자동 승인 환불 요청',
    { onSuccess: () => router.push('/mypage/shuttle?type=current') },
  );

  const checkIsRefundable = () => {
    if (!data) {
      return false;
    }
    const reservationDate = new Date(data.reservation.createdAt);
    const shuttleDate = new Date(
      data.reservation.shuttleRoute.event.dailyEvents.find(
        (dailyEvent) =>
          dailyEvent.dailyEventId ===
          data.reservation.shuttleRoute.dailyEventId,
      )?.date ?? '',
    );
    const currentDate = new Date();

    const diffTime = currentDate.getTime() - reservationDate.getTime();
    if (diffTime < REFUND_DDAY_TIME_LIMIT) {
      return true;
    }

    const diffDays = Math.ceil(
      (shuttleDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays >= REFUND_DAY_LIMIT) {
      return true;
    }

    return false;
  };
  const isRefundable = useMemo(() => checkIsRefundable(), [data]);

  if (isSuccess && !data) {
    router.replace('/mypage/shuttle?type=current');
    return <div className="h-[100dvh]" />;
  }

  return (
    <>
      <AppBar>환불 신청</AppBar>
      <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
        {data && (
          <main className="grow">
            <ReservationCard reservation={data.reservation} />
            <Section title="유의사항">
              <RefundPolicy />
            </Section>
            <Section title="취소 수수료">
              <CancellationAndRefundContent />
            </Section>
            <div className="px-20 pb-12">
              <Button
                onClick={() => setIsOpen(true)}
                disabled={isPending || !isRefundable}
              >
                환불 신청하기
              </Button>
            </div>
          </main>
        )}
      </DeferredSuspense>
      <ConfirmModal
        isOpen={isOpen}
        onClosed={() => setIsOpen(false)}
        onConfirm={postRefund}
        title="정말 환불을 신청하시겠습니까?"
        buttonLabels={{ back: '취소하기', confirm: '환불 신청하기' }}
        disabled={isPending}
      />
    </>
  );
};

export default Refund;
