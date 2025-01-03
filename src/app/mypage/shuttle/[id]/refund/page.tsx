'use client';

import AppBar from '@/components/app-bar/AppBar';
import RefundPolicy from '../components/RefundPolicy';
import { CancellationAndRefundContent } from '@/components/notice-section/NoticeSection';
import Button from '@/components/buttons/button/Button';
import ConfirmModal from '@/components/modals/confirm/ConfirmModal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Section from '../components/Section';
import ReservationCard from '../../components/ReservationCard';
import { useGetUserReservation, usePostRefund } from '@/services/reservation';
import Loading from '@/components/loading/Loading';
import DeferredSuspense from '@/components/loading/DeferredSuspense';

interface Props {
  params: {
    id: string;
  };
}

const Refund = ({ params }: Props) => {
  const { id } = params;
  const {
    data: reservation,
    isLoading,
    isSuccess,
  } = useGetUserReservation(Number(id));

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: postRefund } = usePostRefund(
    reservation?.payment.paymentId ?? 0,
    '자동 승인 환불 요청',
  );

  if (isSuccess && !reservation) {
    router.replace('/mypage/shuttle?type=current');
    return <div className="h-[100dvh]" />;
  }

  return (
    <>
      <AppBar>환불 신청</AppBar>
      <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
        {reservation && (
          <main className="grow">
            <ReservationCard reservation={reservation} />
            <Section title="유의사항">
              <RefundPolicy />
            </Section>
            <Section title="취소 수수료">
              <CancellationAndRefundContent />
            </Section>
            <div className="px-20 pb-12">
              <Button onClick={() => setIsOpen(true)}>환불 신청하기</Button>
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
      />
    </>
  );
};

export default Refund;
