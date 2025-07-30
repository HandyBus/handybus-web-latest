'use client';

import Button from '@/components/buttons/button/Button';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useAtomValue } from 'jotai';
import { EventFormValues } from '../../../form.type';
import { getRouteOfHubWithInfo } from '../../../store/dailyEventIdsWithHubsAtom';
import { dailyEventIdsWithRoutesAtom } from '../../../store/dailyEventIdsWithRoutesAtom';
import { createPaymentPageUrl } from '../../../dailyevent/[dailyEventId]/route/[shuttleRouteId]/payment/payment.const';
import { eventAtom } from '../../../store/eventAtom';
import { useRouter } from 'next/navigation';
import { usePutUser } from '@/services/user.service';
import { toast } from 'react-toastify';

interface Props {
  closeBottomSheet: () => void;
}

const ExtraRealNameInputStep = ({ closeBottomSheet }: Props) => {
  const router = useRouter();
  const event = useAtomValue(eventAtom);
  const { getValues, control, handleSubmit } =
    useFormContext<EventFormValues>();
  const [selectedHubWithInfo, tripType, dailyEvent, passengerCount] = getValues(
    ['selectedHubWithInfo', 'tripType', 'dailyEvent', 'passengerCount'],
  );

  const { mutateAsync: putUser, isPending: isLoading } = usePutUser();

  const dailyEventIdsWithRoutes = useAtomValue(dailyEventIdsWithRoutesAtom);
  const route = getRouteOfHubWithInfo({
    hubWithInfo: selectedHubWithInfo,
    dailyEventIdsWithRoutes,
    dailyEventId: dailyEvent.dailyEventId,
  });

  const [toDestinationShuttleRouteHubId, setToDestinationShuttleRouteHubId] =
    useState<string | undefined>(undefined);
  const [
    fromDestinationShuttleRouteHubId,
    setFromDestinationShuttleRouteHubId,
  ] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!route) {
      return;
    }

    const toDestinationHubId = route.toDestinationShuttleRouteHubs?.find(
      (hub) => hub.regionHubId === selectedHubWithInfo.regionHubId,
    )?.shuttleRouteHubId;
    const fromDestinationHubId = route.fromDestinationShuttleRouteHubs?.find(
      (hub) => hub.regionHubId === selectedHubWithInfo.regionHubId,
    )?.shuttleRouteHubId;

    setToDestinationShuttleRouteHubId(toDestinationHubId);
    setFromDestinationShuttleRouteHubId(fromDestinationHubId);
  }, [route, selectedHubWithInfo.regionHubId]);

  const handleReservationClick = async () => {
    const name = getValues('name');

    if (!event || !route || !name) {
      return;
    }

    try {
      await putUser({ name });

      const url = createPaymentPageUrl({
        eventId: event.eventId,
        dailyEventId: dailyEvent.dailyEventId,
        shuttleRouteId: route.shuttleRouteId,
        tripType,
        toDestinationHubId: toDestinationShuttleRouteHubId,
        fromDestinationHubId: fromDestinationShuttleRouteHubId,
        passengerCount,
      });

      closeBottomSheet();
      router.push(url);
    } catch (error) {
      console.error(error);
      toast.error('이름 변경에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <section className="flex w-full flex-col gap-16">
      <Controller
        control={control}
        name="name"
        rules={{
          required: '이름을 입력해 주세요.',
          pattern: {
            value: /^([가-힣]{2,20}|[a-zA-Z\s]{2,20})$/,
            message:
              '이름은 한글 또는 영문(띄어쓰기 포함) 2~20자로 작성해주세요.',
          },
        }}
        render={({ field, fieldState }) => (
          <>
            <input
              type="text"
              placeholder="이름을 입력해 주세요."
              className={`w-full rounded-[12px] border border-basic-grey-200 p-12 placeholder:text-basic-grey-400 focus:outline-none ${fieldState?.error ? 'border-basic-red-500' : 'focus:border-brand-primary-400'}`}
              {...field}
            />
            {fieldState?.error && (
              <p className="h-[20px] text-12 font-400 text-basic-red-500">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />

      <Button
        variant="primary"
        size="large"
        type="button"
        onClick={handleSubmit(handleReservationClick)}
        disabled={isLoading}
      >
        예약하기
      </Button>
    </section>
  );
};

export default ExtraRealNameInputStep;
