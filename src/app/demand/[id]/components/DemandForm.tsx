'use client';

import Select from '@/components/select/Select';
import {
  BIG_REGIONS,
  BigRegionsType,
  REGION_TO_ID,
  SMALL_REGIONS,
} from '@/constants/regions';
import { dateString } from '@/utils/dateString.util';
import { SyntheticEvent, useMemo, useState } from 'react';
import DemandStats from './DemandStats';
import BottomBar from './BottomBar';
import { useRouter, useSearchParams } from 'next/navigation';
import RouteModal from './RouteModal';
import { DailyEvent, Event } from '@/types/shuttle-operation.type';
import dayjs from 'dayjs';
import useAuthRouter from '@/hooks/useAuthRouter';

export const DEMAND_FORM_ID = 'demand-form';

interface Props {
  event: Event;
}

const DemandForm = ({ event }: Props) => {
  const router = useRouter();
  const authRouter = useAuthRouter();
  const searchParams = useSearchParams();
  const initialBigRegion = searchParams.get('bigRegion') as
    | BigRegionsType
    | undefined;
  const initialSmallRegion = searchParams.get('smallRegion');
  const initialDailyEventId = searchParams.get('dailyEventId');

  const [selectedBigRegion, setSelectedBigRegion] = useState<
    BigRegionsType | undefined
  >(initialBigRegion ?? undefined);
  const [selectedSmallRegion, setSelectedSmallRegion] = useState<
    string | undefined
  >(initialSmallRegion ?? undefined);
  const [selectedDailyEvent, setSelectedDailyEvent] = useState<
    DailyEvent | undefined
  >(
    event.dailyEvents.find(
      (dailyEvent) => dailyEvent.dailyEventId === initialDailyEventId,
    ) ?? undefined,
  );

  const regionId = useMemo(() => {
    if (!selectedBigRegion || !selectedSmallRegion) return undefined;
    return REGION_TO_ID[selectedBigRegion][selectedSmallRegion];
  }, [selectedBigRegion, selectedSmallRegion]);

  const updateQuery = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.replace(`/demand/${event.eventId}?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    authRouter.push(
      `/demand/${event.eventId}/write?dailyEventId=${selectedDailyEvent?.dailyEventId}&regionId=${regionId}`,
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit} id={DEMAND_FORM_ID}>
        <section className="flex flex-col gap-16 p-16">
          <h5 className="text-16 font-400 text-grey-600-sub">
            일자를 선택해주세요
          </h5>
          <Select
            options={event.dailyEvents}
            value={selectedDailyEvent}
            setValue={(value) => {
              setSelectedDailyEvent(value);
              setSelectedBigRegion(undefined);
              setSelectedSmallRegion(undefined);
              updateQuery({
                dailyEventId: String(value?.dailyEventId),
                bigRegion: undefined,
                smallRegion: undefined,
              });
            }}
            renderValue={(value) => dateString(value.date)}
            placeholder="일자"
            isUnderLined
            bottomSheetTitle="일자 선택"
            sort
            sortBy={(a, b) => dayjs(a.date).diff(dayjs(b.date))}
          />
        </section>
        <section className="flex flex-col gap-16 p-16">
          <h5 className="text-16 font-400 text-grey-600-sub">
            지역을 선택해주세요
          </h5>
          <Select
            options={BIG_REGIONS}
            value={selectedBigRegion}
            setValue={(value) => {
              setSelectedBigRegion(value);
              setSelectedSmallRegion(undefined);
              updateQuery({
                bigRegion: value,
                smallRegion: undefined,
              });
            }}
            disabled={!selectedDailyEvent}
            placeholder="도/광역시 선택"
            isUnderLined
            bottomSheetTitle="도/광역시 선택"
          />
          <Select
            options={SMALL_REGIONS?.[selectedBigRegion!] ?? []}
            value={selectedSmallRegion}
            setValue={(value) => {
              setSelectedSmallRegion(value);
              updateQuery({
                smallRegion: value,
              });
            }}
            disabled={!selectedBigRegion}
            placeholder="시/군/구 선택"
            bottomSheetTitle="시/군/구 선택"
            isUnderLined
            sort
          />
        </section>
      </form>
      <div id="divider" className="my-16 h-[8px] bg-grey-50" />
      <DemandStats
        eventId={event.eventId}
        dailyEvent={selectedDailyEvent}
        bigRegion={selectedBigRegion}
        smallRegion={selectedSmallRegion}
        location={event.eventLocationName}
      />
      <BottomBar
        eventName={event.eventName}
        isNotOpen={event.eventStatus !== 'OPEN'}
        isDailyEventSelected={!!selectedDailyEvent}
        isBigRegionSelected={!!selectedBigRegion}
        isSmallRegionSelected={!!selectedSmallRegion}
      />
      {initialDailyEventId && initialBigRegion && initialSmallRegion && (
        <RouteModal
          event={event}
          dailyEventId={initialDailyEventId}
          bigRegion={initialBigRegion}
          smallRegion={initialSmallRegion}
        />
      )}
    </>
  );
};

export default DemandForm;
