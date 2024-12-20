'use client';

import { Control, Controller, useFormContext } from 'react-hook-form';
import Select from '@/components/select/Select';
import { BIG_REGIONS, REGION_TO_ID, SMALL_REGIONS } from '@/constants/regions';
import { useCallback, useEffect, useRef } from 'react';
import { EventDetailProps } from '@/types/event.types';
import { DailyShuttleDetailProps } from '@/types/shuttle.types';
import { formatDate } from '@/components/shuttle-detail/shuttleDetailPage.utils';

interface RouteInfoProps {
  demandData: EventDetailProps;
}

const RouteInfo = ({ demandData }: RouteInfoProps) => {
  const { setValue, control, watch } = useFormContext();
  const bigLocation = watch('bigLocation');
  const smallLocation = watch('smallLocation');
  const previousBigLocationRef = useRef(bigLocation);

  useEffect(() => {
    if (
      previousBigLocationRef.current !== bigLocation &&
      previousBigLocationRef.current !== undefined
    ) {
      setValue('smallLocation', '');
    }
    previousBigLocationRef.current = bigLocation;
  }, [bigLocation]);

  const getRegionId = useCallback(() => {
    if (
      !REGION_TO_ID[bigLocation] ||
      !REGION_TO_ID[bigLocation][smallLocation]
    ) {
      return undefined;
    }
    return REGION_TO_ID[bigLocation][smallLocation];
  }, [bigLocation, smallLocation]);

  useEffect(() => {
    const regionId = getRegionId();
    if (regionId) {
      setValue('regionID', regionId);
    }
  }, [getRegionId, setValue]);

  return (
    <section
      aria-label="demand request by date, location, and route"
      className="flex flex-col gap-[16px] px-16 py-28"
    >
      <h2 className="text-22 font-700 leading-[30.8px] text-grey-900">
        수요 신청하기 <span className="text-red-500">*</span>
      </h2>
      <DailyShuttleSelect control={control} demandData={demandData} />
      <LocationSelect control={control} bigLocation={bigLocation} />
      <RouteTypeSelect control={control} />
    </section>
  );
};

export default RouteInfo;
interface DailyShuttleSelectProps {
  control: Control;
  demandData: EventDetailProps;
  bigLocation?: string;
}

const DailyShuttleSelect = ({
  control,
  demandData,
}: DailyShuttleSelectProps) => (
  <Controller
    control={control}
    name="dailyShuttle"
    render={({ field }) => (
      <Select
        isUnderLined={true}
        options={demandData?.dailyShuttles
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          )
          .map((v: DailyShuttleDetailProps) => formatDate(v.date))}
        value={formatDate(field.value.date) || undefined}
        setValue={(selectedDate) => {
          const selectedShuttle = demandData?.dailyShuttles.find(
            (shuttle) => formatDate(shuttle.date) === selectedDate,
          );
          field.onChange(selectedShuttle);
        }}
        placeholder="일자"
      />
    )}
  />
);

interface LocationSelectProps {
  control: Control;
  bigLocation: string;
}

const LocationSelect = ({ control, bigLocation }: LocationSelectProps) => (
  <>
    <Controller
      control={control}
      name="bigLocation"
      render={({ field }) => (
        <Select
          isUnderLined={true}
          options={BIG_REGIONS}
          value={field.value}
          setValue={field.onChange}
          placeholder="시/도"
        />
      )}
    />
    <Controller
      control={control}
      name="smallLocation"
      render={({ field }) => (
        <Select
          isUnderLined={true}
          options={SMALL_REGIONS[bigLocation as keyof typeof SMALL_REGIONS]}
          value={field.value}
          setValue={field.onChange}
          placeholder="시/군/구"
        />
      )}
    />
  </>
);

interface RouteTypeSelectProps {
  control: Control;
}

const RouteTypeSelect = ({ control }: RouteTypeSelectProps) => (
  <Controller
    control={control}
    name="routeType"
    render={({ field }) => (
      <Select
        isUnderLined={true}
        options={['왕복행', '콘서트행', '귀가행']}
        value={field.value}
        setValue={field.onChange}
        placeholder="왕복행/콘서트행/귀가행"
      />
    )}
  />
);
