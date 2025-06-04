import Button from '@/components/buttons/button/Button';
import { HandyStatus } from '@/types/reservation.type';
import { useState } from 'react';
import CancelHandyApplyModal from './components/CancelHandyApplyModal';
import { useRouter } from 'next/navigation';

interface Props {
  isCanceled: boolean;
  isEnded: boolean;
  handyStatus: HandyStatus;
  reservationId: string;
}

const HandySection = ({
  isCanceled,
  isEnded,
  handyStatus,
  reservationId,
}: Props) => {
  const historyText =
    handyStatus === 'NOT_SUPPORTED' ? '지원 안함' : '지원 완료';
  const statusText =
    handyStatus === 'NOT_SUPPORTED'
      ? '지원 안함'
      : handyStatus === 'SUPPORTED'
        ? '핸디 선정 중'
        : handyStatus === 'ACCEPTED'
          ? '선정'
          : '미선정';

  const router = useRouter();

  const [isCancelHandyApplyModalOpen, setIsCancelHandyApplyModalOpen] =
    useState(false);

  return (
    <>
      <section className="px-16">
        <h3 className="flex items-center justify-between pb-16 text-16 font-600">
          <span>핸디 지원 내역</span>
          {!isCanceled && !isEnded && handyStatus === 'SUPPORTED' && (
            <Button
              type="button"
              variant="tertiary"
              size="small"
              onClick={() => setIsCancelHandyApplyModalOpen(true)}
            >
              지원 취소
            </Button>
          )}
          {!isCanceled && !isEnded && handyStatus === 'ACCEPTED' && (
            <Button
              type="button"
              variant="secondary"
              size="small"
              onClick={() => router.push('/help/what-is-handy')}
            >
              가이드
            </Button>
          )}
        </h3>
        <div className="grid grid-cols-[72px_1fr] gap-x-16 gap-y-8 text-14 font-600">
          <h5>지역 내역</h5>
          <p className={isCanceled ? 'text-basic-grey-400' : ''}>
            {historyText}
          </p>
          {!isCanceled && handyStatus !== 'NOT_SUPPORTED' && (
            <>
              <h5>상태</h5>
              <p
                className={
                  handyStatus === 'ACCEPTED' ? 'text-basic-blue-400' : ''
                }
              >
                {statusText}
              </p>
            </>
          )}
          {isCanceled && (
            <>
              <h5>상태</h5>
              <p className="text-basic-grey-400">-</p>
            </>
          )}
        </div>
      </section>
      <CancelHandyApplyModal
        reservationId={reservationId}
        isOpen={isCancelHandyApplyModalOpen}
        closeModal={() => setIsCancelHandyApplyModalOpen(false)}
      />
    </>
  );
};

export default HandySection;
