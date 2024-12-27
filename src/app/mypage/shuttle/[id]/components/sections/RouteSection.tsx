'use client';

import ShuttleRouteVisualizer from '@/components/shuttle/shuttle-route-visualizer/ShuttleRouteVisualizer';
import Divider from '../Divider';
import { SECTION } from '@/types/shuttle.types';
import { FormProvider, useForm } from 'react-hook-form';
import { HubType, TripType } from '@/types/client.types';
import { useState } from 'react';
import { usePostUpdateReservation } from '@/services/reservation';
import { toast } from 'react-toastify';

interface FormValues {
  toDestinationHubId: number;
  fromDestinationHubId: number;
}

interface Props {
  isShuttleAssigned: boolean;
  reservationId: number;
  tripType: TripType;
  hubs: {
    toDestination: HubType[];
    fromDestination: HubType[];
  };
}

const RouteSection = ({
  isShuttleAssigned,
  reservationId,
  tripType,
  hubs,
}: Props) => {
  const methods = useForm<FormValues>();
  const toDestination =
    tripType === 'FROM_DESTINATION' ? [] : hubs.toDestination;
  const fromDestination =
    tripType === 'TO_DESTINATION' ? [] : hubs.fromDestination;

  const [isEdit, setIsEdit] = useState(false);
  const onError = () => {
    toast.error('탑승지 변경에 실패했습니다.');
  };
  const { mutate: updateReservation } = usePostUpdateReservation(
    reservationId,
    undefined,
    onError,
  );

  const handleSubmit = (formData: FormValues) => {
    setIsEdit(false);
    updateReservation({
      toDestinationShuttleRouteHubId: formData.toDestinationHubId,
      fromDestinationShuttleRouteHubId: formData.fromDestinationHubId,
    });
  };

  return (
    <FormProvider {...methods}>
      <Divider />
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <ShuttleRouteVisualizer
          toDestinationObject={toDestination}
          fromDestinationObject={fromDestination}
          section={isEdit ? SECTION.RESERVATION_DETAIL : SECTION.MY_RESERVATION}
        />
        {!isShuttleAssigned && (
          <div className="flex flex-col items-end gap-8 pb-24 pr-24">
            {isEdit ? (
              <div className="flex gap-8">
                <button
                  type="button"
                  onClick={() => setIsEdit(false)}
                  className="h-[26px] rounded-full border border-grey-100 px-16 text-14 text-grey-600-sub"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="h-[26px] rounded-full border border-grey-100 bg-grey-700 px-16 text-14 text-white"
                >
                  완료
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setIsEdit(true)}
                  className="h-[26px] rounded-full bg-grey-100 px-16 text-14 text-grey-600-sub"
                >
                  탑승지 변경하기
                </button>
                <p className="text-12 font-400 text-grey-500">
                  탑승지 변경은 셔틀 운행일 기준 D-2일까지 가능합니다.
                </p>
              </>
            )}
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default RouteSection;
