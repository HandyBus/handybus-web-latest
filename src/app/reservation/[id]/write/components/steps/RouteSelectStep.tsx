import Select from '@/components/select/Select';
import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import { useGetRoutes } from '@/services/shuttleOperation';
import { DailyShuttleType, ShuttleType } from '@/types/shuttle.types';
import { parseDateString } from '@/utils/dateString';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ReservationFormValues } from '../Form';
import RouteVisualizerWithSelect from '@/components/route-visualizer/RouteVisualizerWithSelect';
import Button from '@/components/buttons/button/Button';
import { toast } from 'react-toastify';
import NoticeSection from '@/components/notice-section/NoticeSection';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  handleNextStep: () => void;
  shuttle: ShuttleType;
  initialDailyShuttleId?: number;
  initialShuttleRouteId?: number;
}

const RouteSelectStep = ({
  handleNextStep,
  shuttle,
  initialDailyShuttleId,
  initialShuttleRouteId,
}: Props) => {
  const { control, watch, setValue, getValues } =
    useFormContext<ReservationFormValues>();

  const [selectedDailyShuttle, setSelectedDailyShuttle] = useState<
    DailyShuttleType | undefined
  >(
    shuttle.dailyShuttles.find(
      (dailyShuttle) => dailyShuttle.dailyShuttleId === initialDailyShuttleId,
    ),
  );

  const { data: routes } = useGetRoutes(
    shuttle.shuttleId,
    selectedDailyShuttle?.dailyShuttleId ?? 0,
    { status: 'OPEN' },
  );
  useEffect(() => {
    if (routes && initialShuttleRouteId) {
      const initialRoute = routes.find(
        (route) => route.shuttleRouteId === initialShuttleRouteId,
      );
      if (initialRoute && getValues('shuttleRoute') === undefined) {
        setValue('shuttleRoute', initialRoute);
      }
    }
  }, [routes, initialShuttleRouteId]);

  const watchType = watch('type');
  const watchShuttleRoute = watch('shuttleRoute');

  useEffect(() => {
    if (watchType === 'TO_DESTINATION') {
      setValue('hub.fromDestinationHub', undefined);
    } else if (watchType === 'FROM_DESTINATION') {
      setValue('hub.toDestinationHub', undefined);
    }
  }, [watchType]);

  const checkValidAndGoNextStep = () => {
    const [shuttleRoute, type, hub] = getValues([
      'shuttleRoute',
      'type',
      'hub',
    ]);
    if (
      !shuttleRoute ||
      !type ||
      (type === 'TO_DESTINATION' && !hub.toDestinationHub) ||
      (type === 'FROM_DESTINATION' && !hub.fromDestinationHub) ||
      (type === 'ROUND_TRIP' &&
        (!hub.toDestinationHub || !hub.fromDestinationHub))
    ) {
      toast.error('모든 항목을 기입해주세요');
      return;
    }
    handleNextStep();
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  const updateDailyShuttleIdParams = (dailyShuttleId: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('dailyShuttleId', dailyShuttleId.toString());
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.replace(`${window.location.pathname}${query}`, { scroll: false });
  };

  return (
    <>
      <section className="flex flex-col gap-16 py-28">
        <h3 className="text-22 font-700 text-grey-900">
          원하는 셔틀을 선택해주세요
        </h3>
        <Select
          options={shuttle.dailyShuttles}
          value={selectedDailyShuttle}
          setValue={(value) => {
            setSelectedDailyShuttle(value);
            updateDailyShuttleIdParams(value.dailyShuttleId);
          }}
          renderValue={(value) => parseDateString(value.date)}
          isUnderLined
          placeholder="탑승일"
          bottomSheetTitle="탑승일 선택"
        />
        <Controller
          control={control}
          name="shuttleRoute"
          render={({ field: { value, onChange } }) => (
            <Select
              options={routes ?? []}
              value={value}
              setValue={(value) => {
                onChange(value);
                setValue('hub', {
                  toDestinationHub: undefined,
                  fromDestinationHub: undefined,
                });
              }}
              renderValue={(value) => value.name}
              isUnderLined
              placeholder="노선 종류"
              bottomSheetTitle="노선 종류 선택"
              disabled={!selectedDailyShuttle || !routes}
            />
          )}
        />
        <Controller
          control={control}
          name="type"
          render={({ field: { value, onChange } }) => (
            <Select
              options={
                ['ROUND_TRIP', 'TO_DESTINATION', 'FROM_DESTINATION'] as const
              }
              value={value}
              setValue={onChange}
              renderValue={(value) => TRIP_STATUS_TO_STRING[value]}
              isUnderLined
              placeholder="왕복/콘서트행/귀가행"
              bottomSheetTitle="왕복/콘서트행/귀가행 선택"
            />
          )}
        />
      </section>
      {watchType && watchShuttleRoute && (
        <>
          <section>
            <Controller
              control={control}
              name="hub"
              render={({ field: { value, onChange } }) => (
                <RouteVisualizerWithSelect
                  type={watchType}
                  toDestinationHubs={watchShuttleRoute.hubs.toDestination}
                  toDestinationHubValue={value.toDestinationHub}
                  setToDestinationHubValue={(toDestinationHub) =>
                    onChange({ ...value, toDestinationHub: toDestinationHub })
                  }
                  fromDestinationHubs={watchShuttleRoute.hubs.fromDestination}
                  fromDestinationHubValue={value.fromDestinationHub}
                  setFromDestinationHubValue={(fromDestinationHub) =>
                    onChange({ ...value, fromDestinationHub })
                  }
                />
              )}
            />
          </section>
          <section className="flex flex-col gap-16 py-44">
            <NoticeSection type={'cancellation-and-refund'} noPadding />
            <NoticeSection type={'term-and-condition'} noPadding />
          </section>
        </>
      )}
      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 bg-white px-16 py-8 shadow-bottomBar">
        <Button type="button" onClick={checkValidAndGoNextStep}>
          다음 단계로
        </Button>
      </div>
    </>
  );
};

export default RouteSelectStep;
