'use client';

import { Control, Controller, useFormContext, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import { BIG_REGIONS, SMALL_REGIONS } from '@/constants/regions';
import Select from '@/components/select/Select';
import { ShuttleFormValues } from './ShuttleForm';
import { EventDetailProps } from '@/types/event.types';
import { DailyShuttleDetailProps } from '@/types/shuttle.types';
import { formatDate } from '../shuttleDetailPage.utils';

interface Props {
  control: Control<ShuttleFormValues>;
  type: 'RESERVATION' | 'DEMAND';
  data: EventDetailProps;
}
const ShuttleSelector = ({ control, type, data }: Props) => {
  const { setValue } = useFormContext<ShuttleFormValues>();
  const bigLocation = useWatch({
    control,
    name: 'bigLocation',
  });

  useEffect(() => {
    if (!bigLocation) {
      setValue('smallLocation', '');
      return;
    }
    setValue('smallLocation', '');
  }, [bigLocation, setValue]);

  return (
    <div>
      <div className="flex flex-col gap-16 p-16">
        <p>운행일을 선택해주세요</p>
        <Controller
          control={control}
          name="dailyShuttle"
          render={({ field }) => (
            <Select
              options={data?.dailyShuttles
                .sort(
                  (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime(),
                )
                .map((v: DailyShuttleDetailProps) => formatDate(v.date))}
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
                  options={
                    SMALL_REGIONS[bigLocation as keyof typeof SMALL_REGIONS]
                  }
                  value={field.value}
                  setValue={field.onChange}
                  placeholder="시/군/구"
                />
              )}
            />
          </>
        )}
        {type === 'RESERVATION' && (
          <>
            <p>노선 종류를 선택해주세요</p>
            <Controller
              control={control}
              name="route"
              render={({ field }) => (
                <Select
                  options={['청주-천안', '청주-대전', '청주-대구']}
                  value={field.value}
                  setValue={field.onChange}
                  placeholder="노선 종류"
                />
              )}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ShuttleSelector;
