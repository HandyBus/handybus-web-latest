'use client';

import Button from '@/components/buttons/button/Button';
import PinIcon from '../../../icons/pin-small.svg';
import Tooltip from '@/components/tooltip/Tooltip';
import RequestSeatAlarmButton from '../components/RequestSeatAlarmButton';
import Badge from '@/components/badge/Badge';
import { DANGER_SEAT_THRESHOLD } from '../../../form.const';
import { useAtomValue, useSetAtom } from 'jotai';
import { useFormContext } from 'react-hook-form';
import { useMemo } from 'react';
import { checkIsSoldOut, getPriorityRemainingSeat } from '@/utils/event.util';
import { EventFormValues } from '../../../form.type';
import {
  dailyEventIdsWithHubsAtom,
  HubWithInfo,
} from '../../../store/dailyEventIdsWithHubsAtom';
import {
  getRecentlyViewedHubId,
  setRecentlyViewedHubId,
} from '@/utils/localStorage';
import {
  isCheckRouteDetailViewFlowAtom,
  selectedHubWithInfoForDetailViewAtom,
} from '../../../store/selectedHubWithInfoForDetailViewAtom';

interface Props {
  toReservationTripTypeStep: () => void;
  toExtraDuplicateHubStep: () => void;
  toExtraSeatAlarmStep: () => void;
  toDemandHubsStep: () => void;
  closeBottomSheet: () => void;
}

const ReservationHubsStep = ({
  toReservationTripTypeStep,
  toExtraDuplicateHubStep,
  toExtraSeatAlarmStep,
  toDemandHubsStep,
  closeBottomSheet,
}: Props) => {
  const { getValues, setValue } = useFormContext<EventFormValues>();
  const dailyEventIdsWithHubs = useAtomValue(dailyEventIdsWithHubsAtom);
  const gungusWithHubs = useMemo(() => {
    const [dailyEvent, sido, openSido] = getValues([
      'dailyEvent',
      'sido',
      'openSido',
    ]);
    const prioritySido = openSido ?? sido;
    const gungusWithHubsAsObject =
      dailyEventIdsWithHubs?.[dailyEvent.dailyEventId]?.[prioritySido] ?? {};
    const gungusWithHubsAsArray = Object.entries(gungusWithHubsAsObject)
      .map(([gungu, hubs]) => {
        const sortedHubs = hubs.sort((a, b) =>
          a[0].name.localeCompare(b[0].name),
        );
        return {
          gungu,
          hubs: sortedHubs,
        };
      })
      .sort((a, b) => a.gungu.localeCompare(b.gungu));
    return gungusWithHubsAsArray;
  }, [dailyEventIdsWithHubs]);

  const setSelectedHubWithInfoForDetailViewAtom = useSetAtom(
    selectedHubWithInfoForDetailViewAtom,
  );
  const isCheckRouteDetailViewFlow = useAtomValue(
    isCheckRouteDetailViewFlowAtom,
  );

  const handleHubClick = (hubsWithInfo: HubWithInfo[]) => {
    setRecentlyViewedHubId(hubsWithInfo[0].regionHubId);
    if (hubsWithInfo.length === 1) {
      setValue('selectedHubWithInfo', hubsWithInfo[0]);
      setValue('hubsWithInfoForDuplicates', undefined);

      if (!isCheckRouteDetailViewFlow) {
        toReservationTripTypeStep();
        return;
      }

      setSelectedHubWithInfoForDetailViewAtom(hubsWithInfo[0]);
      closeBottomSheet();
    } else {
      setValue('hubsWithInfoForDuplicates', hubsWithInfo);
      toExtraDuplicateHubStep();
    }
  };

  const recentlyViewedHubId = getRecentlyViewedHubId();
  const recentlyViewedPossibleHubs = useMemo(() => {
    return gungusWithHubs
      .flatMap((gunguWithHubs) => gunguWithHubs.hubs)
      .find((hubs) =>
        hubs.some((hub) => hub.regionHubId === recentlyViewedHubId),
      );
  }, [gungusWithHubs, recentlyViewedHubId]);

  return (
    <section>
      {recentlyViewedPossibleHubs && (
        <div>
          <h6 className="mb-4 text-16 font-600 text-basic-grey-600">
            최근에 본 정류장
          </h6>
          <Hub
            possibleHubs={recentlyViewedPossibleHubs}
            handleHubClick={() => handleHubClick(recentlyViewedPossibleHubs)}
            toExtraSeatAlarmStep={toExtraSeatAlarmStep}
          />
          <div className="my-12 h-[1px] w-full bg-basic-grey-100" />
        </div>
      )}
      <div>
        {gungusWithHubs.map((gunguWithHubs) => (
          <article key={gunguWithHubs.gungu}>
            <div className="mb-4 flex h-[26px] items-center gap-[2px]">
              <PinIcon />
              <h6 className="text-14 font-600 text-basic-grey-400">
                {gunguWithHubs.gungu}
              </h6>
            </div>
            <ul className="flex flex-col gap-8">
              {gunguWithHubs.hubs.map((possibleHubs) => (
                <Hub
                  key={possibleHubs[0].regionHubId}
                  possibleHubs={possibleHubs}
                  handleHubClick={() => handleHubClick(possibleHubs)}
                  toExtraSeatAlarmStep={toExtraSeatAlarmStep}
                />
              ))}
            </ul>
            <div className="my-12 h-[1px] w-full bg-basic-grey-100" />
          </article>
        ))}
      </div>
      <div className="flex items-center justify-between gap-8 pb-12">
        <div className="flex h-[26px] items-center gap-4">
          <span className="text-16 font-600 text-basic-grey-700">
            찾는 정류장이 없나요?
          </span>
          <Tooltip content="원하는 지역이 보이지 않는다면, 해당 정류장은 수요조사가 진행 중이에요. 셔틀이 열릴 수 있도록 수요조사에 참여해 보세요." />
        </div>
        <Button
          onClick={toDemandHubsStep}
          variant="tertiary"
          size="small"
          type="button"
        >
          요청하기
        </Button>
      </div>
    </section>
  );
};

export default ReservationHubsStep;

interface HubProps {
  possibleHubs: HubWithInfo[];
  handleHubClick: (hubsWithInfo: HubWithInfo[]) => void;
  toExtraSeatAlarmStep: () => void;
}

const Hub = ({
  possibleHubs,
  handleHubClick,
  toExtraSeatAlarmStep,
}: HubProps) => {
  const isDuplicate = possibleHubs.length > 1;
  const isSoldOut = possibleHubs.every((hub) =>
    checkIsSoldOut(hub.remainingSeat),
  );
  const hub = possibleHubs[0];
  const remainingSeat = getPriorityRemainingSeat(hub.remainingSeat);
  const remainingSeatCount = remainingSeat?.count ?? 0;
  const remainingSeatTypeText =
    remainingSeat &&
    (remainingSeat.type === 'ROUND_TRIP'
      ? null
      : remainingSeat.type === 'TO_DESTINATION'
        ? '가는 편'
        : '오는 편');

  return (
    <div key={hub.regionHubId} className="relative w-full">
      <button
        type="button"
        onClick={() => handleHubClick(possibleHubs)}
        disabled={isSoldOut}
        className={`group flex w-full justify-between gap-8 py-12 text-left ${!isDuplicate && isSoldOut && 'pr-[166px]'}`}
      >
        <span className="text-16 font-600 text-basic-grey-700 group-disabled:text-basic-grey-300">
          {hub.name}
        </span>
        {isDuplicate && <Badge className="bg-basic-grey-50">복수 노선</Badge>}
        {!isDuplicate && !isSoldOut && (
          <p className="flex shrink-0 items-center gap-8 text-14 font-500">
            <span className="text-basic-grey-500">{remainingSeatTypeText}</span>
            {remainingSeatTypeText && (
              <div className="h-12 w-[1px] bg-basic-grey-300" />
            )}
            <span
              className={
                remainingSeatCount > DANGER_SEAT_THRESHOLD
                  ? 'text-basic-grey-500'
                  : 'text-basic-red-400'
              }
            >
              {remainingSeatCount}석 남음
            </span>
          </p>
        )}
      </button>
      {!isDuplicate && isSoldOut && (
        <div className="absolute right-0 top-12 flex w-[158px] items-center gap-8">
          <RequestSeatAlarmButton
            toStep={toExtraSeatAlarmStep}
            hubWithInfo={hub}
          />
          <span className="text-14 font-600 text-basic-grey-300">
            전석 매진
          </span>
        </div>
      )}
    </div>
  );
};
