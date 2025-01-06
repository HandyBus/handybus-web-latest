'use client';

import { DailyShuttleType, ShuttleType, TripType } from '@/types/shuttle.types';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import RouteInfo from './RouteInfo';
import JourneyLocationPicker from './JourneyLocationPicker';
import PassengerCount from './PassengerCount';
import Button from '@/components/buttons/button/Button';
import { toast } from 'react-toastify';
import { usePostDemand } from '@/services/demand';

export interface FormValues {
  dailyShuttle: Omit<DailyShuttleType, 'status'>;
  regionId: number | null;
  passengerCount: number;
  type: TripType;
  toDestinationRegionHub?: {
    name: string;
    regionHubId?: number | null;
  };
  fromDestinationRegionHub?: {
    name: string;
    regionHubId?: number | null;
  };
  toDestinationDesiredRegionHub?: string;
  fromDestinationDesiredRegionHub?: string;
}

interface Props {
  shuttle: ShuttleType;
  dailyShuttleId: number;
  regionId: number;
}

const WriteForm = ({ shuttle, dailyShuttleId, regionId }: Props) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      dailyShuttle: shuttle.dailyShuttles.find(
        (dailyShuttle) => dailyShuttle.dailyShuttleId === dailyShuttleId,
      ),
      regionId,
      passengerCount: 0,
      type: undefined,
      toDestinationRegionHub: undefined,
      fromDestinationRegionHub: undefined,
    },
  });

  const { mutate: postDemand } = usePostDemand(shuttle.shuttleId);

  const handleSubmit = (formValues: FormValues) => {
    if (!formValues.dailyShuttle) {
      toast.error('운행일을 선택해주세요.');
      return;
    }
    if (!formValues.regionId) {
      toast.error('지역을 선택해주세요.');
      return;
    }
    if (!formValues.type) {
      toast.error('탑승 방향을 선택해주세요.');
      return;
    }
    if (formValues.passengerCount === 0) {
      toast.error('탑승객 수를 선택해주세요.');
      return;
    }
    if (
      formValues.type === 'ROUND_TRIP' ||
      formValues.type === 'TO_DESTINATION'
    ) {
      if (
        !formValues.toDestinationRegionHub ||
        (!formValues.toDestinationRegionHub.regionHubId &&
          !formValues.toDestinationDesiredRegionHub)
      ) {
        toast.error('탑승 장소를 선택해주세요.');
        return;
      }
    }
    if (
      formValues.type === 'ROUND_TRIP' ||
      formValues.type === 'FROM_DESTINATION'
    ) {
      if (
        !formValues.fromDestinationRegionHub ||
        (!formValues.fromDestinationRegionHub.regionHubId &&
          !formValues.fromDestinationDesiredRegionHub)
      ) {
        toast.error('하차 장소를 선택해주세요.');
        return;
      }
    }

    postDemand({
      dailyShuttleId: formValues.dailyShuttle.dailyShuttleId,
      regionId: formValues.regionId!,
      type: formValues.type,
      passengerCount: formValues.passengerCount,
      toDestinationRegionHub: {
        regionHubId:
          formValues.toDestinationRegionHub?.regionHubId ?? undefined,
        desiredRegionHub: formValues.toDestinationRegionHub
          ? formValues.toDestinationDesiredRegionHub
          : undefined,
      },
      fromDestinationRegionHub: {
        regionHubId:
          formValues.fromDestinationRegionHub?.regionHubId ?? undefined,
        desiredRegionHub: formValues.fromDestinationDesiredRegionHub
          ? formValues.fromDestinationDesiredRegionHub
          : undefined,
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <RouteInfo shuttle={shuttle} regionId={regionId} />
        <Controller
          control={methods.control}
          name="passengerCount"
          render={({ field: { value, onChange } }) => (
            <PassengerCount
              count={value}
              setCount={(newValue) => onChange(newValue)}
            />
          )}
        />
        <JourneyLocationPicker />
        <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 bg-white px-16 py-20">
          <Button>수요조사 신청하기</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default WriteForm;
