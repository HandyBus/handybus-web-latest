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
import { TripType } from '@/types/shuttle-operation.type';
import { FormValues } from './WriteForm';
import { dateString } from '@/utils/dateString.util';
import { EventsViewEntity } from '@/types/shuttle-operation.type';

const TRIP_TYPE_TO_STRING: Record<TripType, string> = {
  ROUND_TRIP: '왕복',
  TO_DESTINATION: '편도 (가는 편)',
  FROM_DESTINATION: '편도 (오는 편)',
};

interface Props {
  event: EventsViewEntity;
  regionId: string;
}

const RouteInfo = ({ event, regionId }: Props) => {
  const { control, getValues, setValue } = useFormContext<FormValues>();

  useEffect(() => {
    const region = ID_TO_REGION[regionId];
    if (!region) {
      return;
    }
    setSelectedBigRegion(region.bigRegion);
    setSelectedSmallRegion(region.smallRegion);
  }, [regionId]);

  const dailyEvent = getValues('dailyEvent');
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
        name="dailyEvent"
        render={({ field: { value, onChange } }) => (
          <Select
            options={event.dailyEvents}
            value={value}
            setValue={(value) => {
              onChange(value);
            }}
            renderValue={(value) => dateString(value.date)}
            placeholder="일자"
            isUnderLined
            bottomSheetTitle="일자 선택"
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
        disabled={!dailyEvent}
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
        bottomSheetTitle="시/군/구 선택"
        isUnderLined
        sort
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
            placeholder="왕복/가는 편/오는 편"
            isUnderLined
            bottomSheetTitle="왕복/가는 편/오는 편 선택"
          />
        )}
      />
    </section>
  );
};

export default RouteInfo;
