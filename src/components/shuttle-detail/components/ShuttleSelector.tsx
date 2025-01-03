'use client';

import { Control, Controller, useFormContext, useWatch } from 'react-hook-form';
import { memo, useEffect, useMemo } from 'react';
import { BIG_REGIONS, SMALL_REGIONS } from '@/constants/regions';
import Select from '@/components/select/Select';
import { EventDetailProps } from '@/types/event.types';
import {
  DailyShuttleDetailProps,
  ShuttleRoute,
  ShuttleRouteEvent,
} from '@/types/shuttle.types';
import { formatDate } from '../shuttleDetailPage.utils';
import SelectLabeled from '@/components/select-labeled/SelectLabeled';
import { ShuttleFormValues } from './shuttleForm.type';
import { useRouter } from 'next/navigation';

interface Props {
  control: Control<ShuttleFormValues>;
  type: 'RESERVATION' | 'DEMAND';
  data: EventDetailProps | ShuttleRouteEvent;
  reservData?: ShuttleRoute[];
}
const ShuttleSelector = ({ control, type, data, reservData }: Props) => {
  const router = useRouter();
  const { setValue, watch } = useFormContext<ShuttleFormValues>();
  const bigLocation = useWatch({
    control,
    name: 'bigLocation',
  });
  const watchDailyShuttle = watch('dailyShuttle');
  const watchShuttleRoute = watch('shuttleRoute');
  const shuttleRouteOptions = useMemo(
    () =>
      reservData
        ?.filter((v) => v.dailyShuttleId === watchDailyShuttle.dailyShuttleId)
        .map((route) => ({
          label: route.name,
          value: route.shuttleRouteId,
        })) ?? [],
    [watchDailyShuttle.dailyShuttleId, reservData],
  );

  useEffect(() => {
    if (!bigLocation) {
      setValue('smallLocation', '');
      return;
    }
    setValue('smallLocation', '');
  }, [bigLocation, setValue]);

  useEffect(() => {
    if (type === 'RESERVATION') {
      router.replace(
        `/shuttle/${data.shuttleId}?dailyShuttleId=${watchDailyShuttle.dailyShuttleId}&shuttleRouteId=${watchShuttleRoute?.value}`,
      );
    }
  }, [watchDailyShuttle, watchShuttleRoute]);

  return (
    <div>
      <div className="flex flex-col gap-16 p-16">
        <p>운행일을 선택해주세요</p>
        <Controller
          control={control}
          name="dailyShuttle"
          render={({ field }) => (
            <Select
              options={sortDailyShuttles(data?.dailyShuttles).map((v) =>
                formatDate(v.date),
              )}
              value={formatDate(field.value.date) || undefined}
              setValue={(selectedDate) => {
                const selectedShuttle = data?.dailyShuttles.find(
                  (shuttle) => formatDate(shuttle.date) === selectedDate,
                );
                field.onChange(selectedShuttle);
              }}
              placeholder="운행일"
            />
          )}
        />
      </div>
      <div className="flex flex-col gap-16 p-16">
        {type === 'DEMAND' && (
          <DemandLocationSelector control={control} bigLocation={bigLocation} />
        )}
        {type === 'RESERVATION' && (
          <ReservationRouteSelector
            control={control}
            options={shuttleRouteOptions}
          />
        )}
      </div>
    </div>
  );
};

export default ShuttleSelector;

interface DemandLocationSelectorProps {
  control: Control<ShuttleFormValues>;
  bigLocation: string;
}
const DemandLocationSelector = memo(
  ({ control, bigLocation }: DemandLocationSelectorProps) => (
    <>
      <p>지역을 선택해주세요</p>
      <Controller
        control={control}
        name="bigLocation"
        render={({ field }) => (
          <Select
            options={BIG_REGIONS}
            value={field.value}
            setValue={field.onChange}
            placeholder="광역시/도"
          />
        )}
      />
      <Controller
        control={control}
        name="smallLocation"
        render={({ field }) => (
          <Select
            options={SMALL_REGIONS[bigLocation as keyof typeof SMALL_REGIONS]}
            value={field.value}
            setValue={field.onChange}
            placeholder="시/군/구"
          />
        )}
      />
    </>
  ),
);

DemandLocationSelector.displayName = 'DemandLocationSelector';

interface ReservationRouteSelectorProps {
  control: Control<ShuttleFormValues>;
  options: { label: string; value: number }[];
}
const ReservationRouteSelector = memo(
  ({ control, options }: ReservationRouteSelectorProps) => (
    <>
      <p>노선 종류를 선택해주세요</p>
      <Controller
        control={control}
        name="shuttleRoute"
        render={({ field }) => (
          <SelectLabeled
            options={options}
            value={field.value}
            setValue={field.onChange}
            placeholder="노선 종류"
          />
        )}
      />
    </>
  ),
);

ReservationRouteSelector.displayName = 'ReservationRouteSelector';

const sortDailyShuttles = (shuttles: DailyShuttleDetailProps[]) =>
  shuttles.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
