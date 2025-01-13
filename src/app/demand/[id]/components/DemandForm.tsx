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

interface Props {
  event: Event;
}

const DemandForm = ({ event }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialBigRegion = searchParams.get('bigRegion') as
    | BigRegionsType
    | undefined;
  const initialSmallRegion = searchParams.get('smallRegion');
  const initialDailyShuttleId = searchParams.get('dailyShuttleId')
    ? Number(searchParams.get('dailyShuttleId'))
    : undefined;

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
      (dailyEvent) => dailyEvent.dailyEventId === initialDailyShuttleId,
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
    router.push(
      `/demand/${event.eventId}/write?dailyEventId=${selectedDailyEvent?.dailyEventId}&regionId=${regionId}`,
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="flex flex-col gap-16 p-16">
        <h5 className="text-16 font-400 text-grey-600-sub">
          운행일을 선택해주세요
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
          placeholder="운행일"
          isUnderLined
          bottomSheetTitle="운행일 선택"
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
          isUnderLined
          bottomSheetTitle="시/군/구 선택"
        />
      </section>
      <div id="divider" className="my-16 h-[8px] bg-grey-50" />
      {selectedDailyEvent && (
        <DemandStats
          eventId={event.eventId}
          dailyEvent={selectedDailyEvent}
          regionId={regionId}
          location={event.eventLocationName}
        />
      )}
      <BottomBar
        eventName={event.eventName}
        disabled={
          !selectedDailyEvent || !regionId || event.eventStatus !== 'OPEN'
        }
      />
      {initialDailyShuttleId && initialBigRegion && initialSmallRegion && (
        <RouteModal
          event={event}
          dailyEventId={initialDailyShuttleId}
          bigRegion={initialBigRegion}
          smallRegion={initialSmallRegion}
        />
      )}
    </form>
  );
};

export default DemandForm;
