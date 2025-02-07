'use client';

import { TripType } from '@/types/shuttle-operation.type';
import { FormProvider, useForm } from 'react-hook-form';
import RouteInfo from './RouteInfo';
import JourneyLocationPicker from './JourneyLocationPicker';
import Button from '@/components/buttons/button/Button';
import { toast } from 'react-toastify';
import { DailyEvent, Event } from '@/types/shuttle-operation.type';
import { usePostDemand } from '@/services/shuttle-operation.service';
import { useRouter } from 'next/navigation';

export interface FormValues {
  dailyEvent: DailyEvent;
  regionId: string | null;
  type: TripType;
  toDestinationRegionHub?: {
    name: string;
    regionHubId?: string | null;
  };
  fromDestinationRegionHub?: {
    name: string;
    regionHubId?: string | null;
  };
  toDestinationDesiredRegionHub?: string;
  fromDestinationDesiredRegionHub?: string;
}

interface Props {
  event: Event;
  dailyEventId: string;
  regionId: string;
}

const WriteForm = ({ event, dailyEventId, regionId }: Props) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      dailyEvent: event.dailyEvents.find(
        (dailyEvent) => dailyEvent.dailyEventId === dailyEventId,
      ),
      regionId,
      type: undefined,
      toDestinationRegionHub: undefined,
      fromDestinationRegionHub: undefined,
    },
  });

  const router = useRouter();
  const { mutate: postDemand, isPending } = usePostDemand({
    onSuccess: () => {
      router.push(`/demand/${event.eventId}`);
    },
  });

  const handleSubmit = (formValues: FormValues) => {
    if (!formValues.dailyEvent) {
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
      eventId: event.eventId,
      dailyEventId: formValues.dailyEvent.dailyEventId,
      body: {
        regionId: formValues.regionId,
        type: formValues.type,
        passengerCount: 1,
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
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <RouteInfo event={event} regionId={regionId} />
        <JourneyLocationPicker />
        <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 bg-white px-16 py-20">
          <Button disabled={isPending}>수요조사 신청하기</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default WriteForm;
