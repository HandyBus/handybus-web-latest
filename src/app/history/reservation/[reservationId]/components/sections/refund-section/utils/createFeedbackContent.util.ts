import { ReservationsViewEntity } from '@/types/reservation.type';
import { UseFormGetValues } from 'react-hook-form';
import {
  CANCEL_REASON_DETAIL_OPTIONS,
  CANCEL_REASON_OPTIONS,
} from '../const/refund.const';

interface CancelReasonForm {
  cancelReason: string;
  cancelReasonDescription: string;
  cancelReasonDetail: string;
  cancelReasonDetailDescription: string;
  refundAccountNumber: string;
}

export const createFeedbackContent = (
  reservation: ReservationsViewEntity,
  getValues: UseFormGetValues<CancelReasonForm>,
) => {
  const cancelReason = getValues('cancelReason');
  const cancelReasonDescription = getValues('cancelReasonDescription');
  const cancelReasonDetail = getValues('cancelReasonDetail');
  const cancelReasonDetailDescription = getValues(
    'cancelReasonDetailDescription',
  );

  const baseContent = `ReservationId: ${reservation.reservationId}, 취소 사유: ${cancelReason}`;
  const baseDescription =
    cancelReason === CANCEL_REASON_OPTIONS.OTHER
      ? `, 기타 의견: ${cancelReasonDescription}`
      : '';

  let detailContent = '';
  if (cancelReason === CANCEL_REASON_OPTIONS.OTHER_SHUTTLE) {
    detailContent = `, 취소 사유 상세: ${cancelReasonDetail}`;
    if (cancelReasonDetail === CANCEL_REASON_DETAIL_OPTIONS.OTHER) {
      detailContent += `, 상세 기타 의견: ${cancelReasonDetailDescription}`;
    }
  }

  return baseContent + baseDescription + detailContent;
};
