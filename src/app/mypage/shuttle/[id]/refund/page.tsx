'use client';

import AppBar from '@/components/app-bar/AppBar';
import RefundPolicy from '../components/RefundPolicy';
import { CancellationAndRefundContent } from '@/components/notice-section/NoticeSection';
import Button from '@/components/buttons/button/Button';
import ConfirmModal from '@/components/modals/confirm/ConfirmModal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Section from '../components/Section';
import ReservationCard from '../../components/ReservationCard';
import { useGetUserDashboard } from '@/services/users';
// import { usePostRefund } from '@/services/reservation';

interface Props {
  params: {
    id: string;
  };
}

const Refund = ({ params }: Props) => {
  const { id } = params;
  const { data, isLoading } = useGetUserDashboard();
  const reservation = data?.reservations.current.find(
    (reservation) => reservation.id === Number(id),
  );

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  // TODO: 결제 연동 후 주석 해제 및 모달에 함수 연결
  // const { mutate: postRefund } = usePostRefund(reservation.payment.id, '');

  if (isLoading) {
    return <div className="h-[100dvh]" />;
  }
  if (!reservation) {
    router.replace('/mypage/shuttle?type=current');
    return <div className="h-[100dvh]" />;
  }

  return (
    <>
      <AppBar>환불 신청</AppBar>
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
      <ConfirmModal
        isOpen={isOpen}
        onClosed={() => setIsOpen(false)}
        onConfirm={() => {
          router.push('/mypage/shuttle?type=current');
          toast.success('환불 신청이 완료되었습니다.');
        }}
        title="정말 환불을 신청하시겠습니까?"
        buttonLabels={{ back: '취소하기', confirm: '환불 신청하기' }}
      />
    </>
  );
};

export default Refund;
