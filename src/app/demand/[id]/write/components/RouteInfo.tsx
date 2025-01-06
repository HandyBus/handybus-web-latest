'use client';

import { Controller, useFormContext } from 'react-hook-form';
import Select from '@/components/select/Select';
import {
  BIG_REGIONS,
  BigRegionsType,
  ID_TO_REGION,
  REGION_TO_ID,
  SMALL_REGIONS,
} from '@/constants/regions';
import { useEffect, useState } from 'react';
import { ShuttleType, TripType } from '@/types/shuttle.types';
import { FormValues } from './WriteForm';
import { parseDateString } from '@/utils/dateString';

const TRIP_TYPE_TO_STRING: Record<TripType, string> = {
  ROUND_TRIP: '왕복',
  TO_DESTINATION: '편도 (콘서트행)',
  FROM_DESTINATION: '편도 (귀가행)',
};

interface Props {
  shuttle: ShuttleType;
  regionId: number;
}

const RouteInfo = ({ shuttle, regionId }: Props) => {
  const { control, getValues, setValue } = useFormContext<FormValues>();

  useEffect(() => {
    const region = ID_TO_REGION[regionId];
    if (!region) {
      return;
    }
    setSelectedBigRegion(region.bigRegion);
    setSelectedSmallRegion(region.smallRegion);
  }, [regionId]);

  const dailyShuttle = getValues('dailyShuttle');
  const [selectedBigRegion, setSelectedBigRegion] = useState<BigRegionsType>();
  const [selectedSmallRegion, setSelectedSmallRegion] = useState<string>();

  useEffect(() => {
    if (!selectedBigRegion || !selectedSmallRegion) {
      return;
    }
    const regionId = REGION_TO_ID[selectedBigRegion][selectedSmallRegion];
    setValue('regionId', regionId);
  }, [selectedSmallRegion]);

  return (
    <section
      aria-label="demand request by date, location, and route"
      className="flex flex-col gap-[16px] px-16 py-28"
    >
      <h2 className="text-22 font-700 leading-[30.8px] text-grey-900">
        수요 신청 정보를 입력해주세요
      </h2>
      <Controller
        control={control}
        name="dailyShuttle"
        render={({ field: { value, onChange } }) => (
          <Select
            options={shuttle.dailyShuttles}
            value={value}
            setValue={(value) => {
              onChange(value);
            }}
            renderValue={(value) => parseDateString(value.date)}
            placeholder="운행일"
            isUnderLined
            bottomSheetTitle="운행일 선택"
          />
        )}
      />
      <Select
        options={BIG_REGIONS}
        value={selectedBigRegion}
        setValue={(value) => {
          setSelectedBigRegion(value);
          setSelectedSmallRegion(undefined);
          setValue('regionId', null);
          setValue('toDestinationRegionHub', undefined);
          setValue('toDestinationDesiredRegionHub', undefined);
          setValue('fromDestinationRegionHub', undefined);
          setValue('fromDestinationDesiredRegionHub', undefined);
        }}
        disabled={!dailyShuttle}
        placeholder="도/광역시 선택"
        isUnderLined
        bottomSheetTitle="도/광역시 선택"
      />
      <Select
        options={SMALL_REGIONS?.[selectedBigRegion!] ?? []}
        value={selectedSmallRegion}
        setValue={(value) => {
          setSelectedSmallRegion(value);
        }}
        disabled={!selectedBigRegion}
        placeholder="시/군/구 선택"
        isUnderLined
        bottomSheetTitle="시/군/구 선택"
      />
      <Controller
        control={control}
        name="type"
        render={({ field: { value, onChange } }) => (
          <Select
            options={Object.keys(TRIP_TYPE_TO_STRING)}
            value={value}
            setValue={(value) => {
              onChange(value);
              setValue('toDestinationRegionHub', undefined);
              setValue('toDestinationDesiredRegionHub', undefined);
              setValue('fromDestinationRegionHub', undefined);
              setValue('fromDestinationDesiredRegionHub', undefined);
            }}
            renderValue={(value) => TRIP_TYPE_TO_STRING[value as TripType]}
            placeholder="왕복/콘서트행/귀가행"
            isUnderLined
            bottomSheetTitle="왕복/콘서트행/귀가행 선택"
          />
        )}
      />
    </section>
  );
};

export default RouteInfo;
