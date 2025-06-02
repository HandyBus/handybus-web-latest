'use client';

import Button from '@/components/buttons/button/Button';
import { useFormContext } from 'react-hook-form';
import { EventFormValues } from '../../../form.type';
import ArrowRightIcon from '../../../icons/arrow-right.svg';
import { useGetUserAlertRequest } from '@/services/alertRequest.service';
import { useEffect } from 'react';

interface Props {
  toExtraHubsInRouteStep: () => void;
  closeBottomSheet: () => void;
  updateUserAlertRequests: () => void;
  openAlertRequestFeedbackScreen: () => void;
}

const ExtraSeatAlarmStep = ({
  toExtraHubsInRouteStep,
  closeBottomSheet,
  updateUserAlertRequests,
  openAlertRequestFeedbackScreen,
}: Props) => {
  const { getValues } = useFormContext<EventFormValues>();
  const [
    selectedHubForSeatAlarm,
    selectedRouteForSeatAlarm,
    selectedShuttleRouteAlertRequestIdForSeatAlarm,
  ] = getValues([
    'selectedHubForSeatAlarm',
    'selectedRouteForSeatAlarm',
    'selectedShuttleRouteAlertRequestIdForSeatAlarm',
  ]);

  const { data: shuttleRouteAlertRequest } = useGetUserAlertRequest(
    selectedShuttleRouteAlertRequestIdForSeatAlarm,
  );

  const hubName = selectedHubForSeatAlarm?.name;
  const routeName = selectedRouteForSeatAlarm?.name;
  const hubCount = (
    selectedRouteForSeatAlarm?.toDestinationShuttleRouteHubs ??
    selectedRouteForSeatAlarm.fromDestinationShuttleRouteHubs ??
    []
  ).length;
  const alertRequestQueueIndex = shuttleRouteAlertRequest?.queueIndex;

  useEffect(() => {
    updateUserAlertRequests();
  }, []);

  return (
    <section className="flex w-full flex-col items-center gap-16">
      <article className="flex w-full flex-col items-center gap-8 rounded-8 bg-basic-grey-50 px-16 py-12">
        <h5 className="text-14 font-600 leading-[160%] text-basic-grey-600">
          [{routeName}]
        </h5>
        <h3 className="text-18 font-600 leading-[160%] text-basic-grey-700">
          {hubName}
        </h3>
        <p className="h-[22px] text-14 font-500 leading-[160%] text-brand-primary-400">
          {alertRequestQueueIndex
            ? `${alertRequestQueueIndex}번째로 알림 신청 중`
            : ''}
        </p>
      </article>
      <div className="h-[1px] w-full bg-basic-grey-100" />
      <button
        onClick={toExtraHubsInRouteStep}
        type="button"
        className="flex w-full items-center justify-between"
      >
        <span className="text-16 font-500 text-basic-grey-600">
          노선 내 정류장
        </span>
        <span className="flex items-center text-16 font-500 text-basic-grey-700">
          {hubCount}개<ArrowRightIcon />
        </span>
      </button>
      <div className="flex w-full flex-col gap-8">
        <Button
          variant="primary"
          size="large"
          className="w-full"
          onClick={closeBottomSheet}
        >
          완료
        </Button>
        <Button
          variant="text"
          size="large"
          onClick={openAlertRequestFeedbackScreen}
        >
          의견 보내기
        </Button>
      </div>
    </section>
  );
};

export default ExtraSeatAlarmStep;
