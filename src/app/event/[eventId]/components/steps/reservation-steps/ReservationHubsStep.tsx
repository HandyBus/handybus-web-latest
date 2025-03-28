'use client';

import Button from '@/components/buttons/button/Button';
import PinIcon from '../../../icons/pin-small.svg';
import Tooltip from '@/components/tooltip/Tooltip';
import RequestSeatAlarmButton from '../../RequestSeatAlarmButton';
import Badge from '@/components/badge/Badge';
import { DANGER_SEAT_THRESHOLD } from '../../../form.const';
import {
  datesWithHubsAtom,
  HubWithInfo,
} from '../../../store/datesWithHubsAtom';
import { useAtomValue } from 'jotai';
import { EventFormValues } from '../../EventForm';
import { useFormContext } from 'react-hook-form';
import { useMemo } from 'react';
import { checkIsSoldOut, getPriorityRemainingSeat } from '../../../event.util';

interface Props {
  toReservationTripTypeStep: () => void;
  toExtraDuplicateHubStep: () => void;
  toExtraSeatAlarmStep: () => void;
  toDemandHubsStep: () => void;
}

const ReservationHubsStep = ({
  toReservationTripTypeStep,
  toExtraDuplicateHubStep,
  toExtraSeatAlarmStep,
  toDemandHubsStep,
}: Props) => {
  const { getValues, setValue } = useFormContext<EventFormValues>();
  const datesWithHubs = useAtomValue(datesWithHubsAtom);
  const gungusWithHubs = useMemo(() => {
    const [date, sido, openSido] = getValues(['date', 'sido', 'openSido']);
    const prioritySido = openSido ?? sido;
    const gungusWithHubsAsObject = datesWithHubs?.[date]?.[prioritySido] ?? {};
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
  }, [datesWithHubs, getValues]);

  const handleHubClick = (hubsWithInfo: HubWithInfo[]) => {
    if (hubsWithInfo.length === 1) {
      setValue('selectedHubWithInfo', hubsWithInfo[0]);
      setValue('hubsWithInfoForDuplicates', undefined);
      toReservationTripTypeStep();
    } else {
      setValue('hubsWithInfoForDuplicates', hubsWithInfo);
      toExtraDuplicateHubStep();
    }
  };

  return (
    <section>
      {gungusWithHubs.map((gunguWithHubs) => (
        <article key={gunguWithHubs.gungu}>
          <div className="mb-4 flex h-[26px] items-center gap-[2px]">
            <PinIcon />
            <h6 className="text-14 font-700 text-basic-grey-600">
              {gunguWithHubs.gungu}
            </h6>
          </div>
          <ul>
            {gunguWithHubs.hubs.map((possibleHubs) => {
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
                    className={`flex w-full justify-between gap-8 py-12 text-left ${!isDuplicate && isSoldOut && 'pr-[166px]'}`}
                  >
                    <span className="text-16 font-600 text-basic-grey-700">
                      {hub.name}
                    </span>
                    {isDuplicate && (
                      <Badge className="bg-basic-grey-50">복수 노선</Badge>
                    )}
                    {!isDuplicate && !isSoldOut && (
                      <p
                        className={`flex shrink-0 items-center gap-8 text-14 font-500 ${
                          remainingSeatCount > DANGER_SEAT_THRESHOLD
                            ? 'text-basic-grey-500'
                            : 'text-basic-red-400'
                        }`}
                      >
                        <span>{remainingSeatTypeText}</span>
                        {remainingSeatTypeText && (
                          <div className="h-12 w-[1px] bg-basic-grey-300" />
                        )}
                        <span>{remainingSeatCount}석 남음</span>
                      </p>
                    )}
                  </button>
                  {!isDuplicate && isSoldOut && (
                    <div className="absolute right-0 top-12 flex w-[158px] items-center gap-8">
                      <RequestSeatAlarmButton toStep={toExtraSeatAlarmStep} />
                      <span className="text-14 font-600 text-basic-grey-300">
                        전석 매진
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </ul>
          <div className="my-12 h-[1px] w-full bg-basic-grey-100" />
        </article>
      ))}
      <div className="flex items-center justify-between gap-8 pb-12">
        <div className="flex h-[26px] items-center gap-4">
          <span className="text-16 font-600 text-basic-grey-700">
            찾는 정류장이 없다면?
          </span>
          <Tooltip content="예약 시 원하는 지역이 보이지 않는다면, 해당 정류장은 수요조사가 진행 중이에요. 충분한 인원이 모여 노선이 열릴 수 있도록 수요조사에 참여해 보세요!" />
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
