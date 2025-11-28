import Button from '@/components/buttons/button/Button';
import WrapperWithDivider from '../../WrapperWithDivider';
import NewIcon from './icons/new.svg';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { checkIsReservationTransferablePeriod } from '@/utils/reservationTransfer.util';
import { useRouter } from 'next/navigation';
import { ReservationTransferRequestsEntity } from '@/types/reservationTransferRequest.type';
import { formatPhoneNumber } from '@/utils/common.util';
import { dateString } from '@/utils/dateString.util';
import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import useBottomSheet from '@/hooks/useBottomSheet';
import { toast } from 'react-toastify';
import { putCancelReservationTransferRequest } from '@/services/reservationTransferRequest.service';

interface Props {
  isTransferredReservation: boolean;
  reservation: ReservationsViewEntity;
  reservationTransferRequests: ReservationTransferRequestsEntity[];
  isReservationCanceled: boolean;
  isShuttleRouteEnded: boolean;
}

const ReservationTransferSection = ({
  isTransferredReservation,
  reservation,
  reservationTransferRequests,
  isReservationCanceled,
  isShuttleRouteEnded,
}: Props) => {
  const isReservationTransferablePeriod =
    checkIsReservationTransferablePeriod(reservation);

  const pendingReservationTransferRequests = reservationTransferRequests.filter(
    (reservationTransferRequest) =>
      reservationTransferRequest.status === 'PENDING',
  );
  const isPendingReservationTransferRequestAvailable =
    pendingReservationTransferRequests.length > 0;
  const pendingReservationTransferRequest =
    isPendingReservationTransferRequestAvailable
      ? pendingReservationTransferRequests[0]
      : null;

  const router = useRouter();
  const redirectToReservationTransfer = () => {
    router.push(
      `/history/reservation/${reservation.reservationId}/reservation-transfer`,
    );
  };

  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();
  const handleCancelReservationTransfer = async (
    reservationTransferRequestId: string,
  ) => {
    try {
      await putCancelReservationTransferRequest(reservationTransferRequestId);
      closeBottomSheet();
      toast.success('선물을 취소했어요.');
      router.replace('/history?type=reservation');
    } catch (error) {
      console.error(error);
      toast.error('잠시 후 다시 시도해주세요.');
    }
  };

  if (
    isShuttleRouteEnded ||
    isReservationCanceled ||
    isTransferredReservation
  ) {
    return null;
  }

  return (
    <>
      <WrapperWithDivider>
        <section className="px-16 py-24">
          <h3 className="relative pb-16 text-16 font-600">
            선물하기
            <div className="absolute left-[57px] top-0">
              <NewIcon />
            </div>
          </h3>
          {isPendingReservationTransferRequestAvailable &&
          pendingReservationTransferRequest ? (
            <>
              <div className="grid grid-cols-[72px_1fr] gap-x-16 gap-y-8 pb-16 text-14 font-600">
                <h5>받는 사람</h5>
                <p>
                  {formatPhoneNumber(
                    pendingReservationTransferRequest.receiverPhoneNumber,
                  )}
                </p>
                <h5>일시</h5>
                <p>
                  {dateString(pendingReservationTransferRequest.expiresAt, {
                    showYear: true,
                    showDate: true,
                    showTime: true,
                    showWeekday: true,
                  })}
                </p>
                <h5>진행 상황</h5>
                <p>수락 전</p>
              </div>
              <div className="pb-16 text-14 font-500 leading-[160%] text-basic-grey-500">
                * 선물 수락 후, 예약 정보는 자동으로 수신자에게 전달돼요. 선물
                전송이 완료되면 더 이상 예약 정보를 확인할 수 없어요.
              </div>
              <Button
                type="button"
                variant="s-destructive"
                size="large"
                onClick={openBottomSheet}
                disabled={!isReservationTransferablePeriod}
              >
                선물 취소하기
              </Button>
              <BottomSheet
                ref={bottomSheetRef}
                title="선물한 탑승권을 취소할까요?"
              >
                <div
                  ref={contentRef}
                  className="flex flex-col gap-16 scrollbar-hidden"
                >
                  <div className="flex flex-col items-center justify-center gap-8 rounded-8 bg-basic-grey-50 p-16">
                    <h5 className="text-18 font-600">받는 사람</h5>
                    <p className="text-18 font-600">
                      {formatPhoneNumber(
                        pendingReservationTransferRequest.receiverPhoneNumber,
                        true,
                      )}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="p-destructive"
                    size="large"
                    onClick={() =>
                      handleCancelReservationTransfer(
                        pendingReservationTransferRequest.id,
                      )
                    }
                  >
                    취소하기
                  </Button>
                </div>
              </BottomSheet>
            </>
          ) : (
            <>
              <p className="pb-16 text-14 font-500 leading-[160%] text-basic-grey-700">
                {isReservationTransferablePeriod
                  ? '탑승권은 받는 사람이 24시간 내 수락해야 전달이 완료돼요.'
                  : '선물하기는 탑승일 기준 6일 전까지 가능해요.'}
              </p>
              <Button
                type="button"
                variant="tertiary"
                size="large"
                onClick={redirectToReservationTransfer}
                disabled={!isReservationTransferablePeriod}
              >
                {isReservationTransferablePeriod
                  ? '탑승권 선물하기'
                  : '지금은 선물할 수 없어요'}
              </Button>
            </>
          )}
        </section>
      </WrapperWithDivider>
    </>
  );
};

export default ReservationTransferSection;
