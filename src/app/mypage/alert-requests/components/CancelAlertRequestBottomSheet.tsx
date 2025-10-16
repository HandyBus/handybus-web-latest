'use client';

import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import Button from '@/components/buttons/button/Button';
import { BottomSheetRefs } from '@/hooks/useBottomSheet';
import { useDeleteAlertRequest } from '@/services/alertRequest.service';
import { ShuttleRouteAlertRequestsViewEntity } from '@/types/alertRequest.type';
import { toast } from 'react-toastify';
import * as Sentry from '@sentry/nextjs';
import dayjs from 'dayjs';

interface Props extends BottomSheetRefs {
  alertRequest: ShuttleRouteAlertRequestsViewEntity;
  closeBottomSheet: () => void;
}

const CancelAlertRequestBottomSheet = ({
  bottomSheetRef,
  contentRef,
  alertRequest,
  closeBottomSheet,
}: Props) => {
  const { mutateAsync: deleteAlertRequest } = useDeleteAlertRequest();

  const handleDeleteAlertRequest = async () => {
    try {
      await deleteAlertRequest({
        eventId: alertRequest.shuttleRoute.event.eventId,
        dailyEventId: alertRequest.shuttleRoute.dailyEventId,
        shuttleRouteId: alertRequest.shuttleRoute.shuttleRouteId,
        shuttleRouteAlertRequestId: alertRequest.shuttleRouteAlertRequestId,
      });
      closeBottomSheet();
      toast.success('빈자리 알림받기가 취소되었어요.');
    } catch (error) {
      Sentry.captureException(error, {
        tags: {
          component: 'AlertRequestCard',
          page: 'mypage',
          feature: 'alert-request',
          action: 'delete-alert-request',
          environment: process.env.NODE_ENV || 'development',
        },
        extra: {
          eventId: alertRequest.shuttleRoute.event.eventId,
          dailyEventId: alertRequest.shuttleRoute.dailyEventId,
          shuttleRouteId: alertRequest.shuttleRoute.shuttleRouteId,
          shuttleRouteAlertRequestId: alertRequest.shuttleRouteAlertRequestId,
          timestamp: dayjs().toISOString(),
        },
      });
      console.error(error);
      toast.error('잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <BottomSheet ref={bottomSheetRef} title="빈자리 알림을 취소할까요?">
      <div ref={contentRef}>
        <Button
          type="button"
          variant="p-destructive"
          size="large"
          onClick={handleDeleteAlertRequest}
        >
          취소하기
        </Button>
      </div>
    </BottomSheet>
  );
};

export default CancelAlertRequestBottomSheet;
