'use client';

import { useEffect, useMemo } from 'react';
import Header from '../Header';
import { HandyPartyModalFormValues } from '../../HandyPartyModal';
import { useFormContext } from 'react-hook-form';
import {
  HANDY_PARTY_AREA_TO_ADDRESS,
  HandyPartyRouteArea,
} from '@/constants/handyPartyArea.const';
import { useReservationTrackingGlobal } from '@/hooks/analytics/useReservationTrackingGlobal';
import Tooltip from '@/components/tooltip/Tooltip';
import { useAtomValue } from 'jotai';
import { dailyEventIdsWithHubsAtom } from '@/app/event/[eventId]/store/dailyEventIdsWithHubsAtom';
import { HANDY_PARTY_PREFIX } from '@/constants/common';

interface Props {
  onBack: () => void;
  onNext: () => void;
  possibleHandyPartyAreas: HandyPartyRouteArea[];
}

const PossibleRegionStep = ({
  onBack,
  onNext,
  possibleHandyPartyAreas,
}: Props) => {
  const { getValues, setValue } = useFormContext<HandyPartyModalFormValues>();
  const { setReservationTrackingStep } = useReservationTrackingGlobal();

  useEffect(() => {
    setReservationTrackingStep('[핸디팟] 주소 입력');
  }, [setReservationTrackingStep]);

  const dailyEventIdsWithHubs = useAtomValue(dailyEventIdsWithHubsAtom);

  const { prioritySido, isShuttleBusAvailable } = useMemo(() => {
    if (!dailyEventIdsWithHubs) {
      return {
        prioritySido: undefined,
        isShuttleBusAvailable: false,
      };
    }

    const [dailyEvent, sido, openSido] = getValues([
      'dailyEvent',
      'sido',
      'openSido',
    ]);

    const prioritySido = openSido ?? sido;
    const sidosWithGungus = dailyEventIdsWithHubs?.[dailyEvent.dailyEventId];
    const gungusWithHubs = sidosWithGungus?.[prioritySido];
    const flattenedHubs = Object.values(gungusWithHubs ?? {}).flatMap((hubs) =>
      hubs.flatMap((hubsOfRoute) => hubsOfRoute),
    );

    const shuttleBusHubs = flattenedHubs.filter(
      (hub) => !hub.name.includes(HANDY_PARTY_PREFIX),
    );

    const isShuttleBusAvailable = shuttleBusHubs.length > 0;

    return {
      prioritySido,
      isShuttleBusAvailable,
    };
  }, [getValues, dailyEventIdsWithHubs]);

  const handleSelectArea = (area: HandyPartyRouteArea) => {
    setValue('selectedArea', area);
    onNext();
  };

  return (
    <div className="flex h-full grow flex-col gap-16">
      <Header
        onBack={onBack}
        title={`${prioritySido} 내 운행 지역이예요`}
        description={'핸디팟 이용을 원하시는 지역을 선택해주세요'}
      />
      <ul className="flex w-full flex-1 flex-col gap-8 overflow-y-auto px-24 pb-12">
        {possibleHandyPartyAreas.map((area) => (
          <li key={area}>
            <button
              type="button"
              className="w-full py-12 text-left text-16 font-600 leading-[160%] text-basic-grey-700"
              onClick={() => handleSelectArea(area)}
            >
              <div>
                <div className="text-16 font-600 leading-[160%] text-basic-grey-700">
                  {area}
                </div>
                <div className="text-12 font-500 leading-[160%] text-basic-grey-600">
                  {HANDY_PARTY_AREA_TO_ADDRESS[area].sido === '서울'
                    ? HANDY_PARTY_AREA_TO_ADDRESS[area].gungu.join(', ')
                    : HANDY_PARTY_AREA_TO_ADDRESS[area].dong &&
                      `운행 가능 지역: ${HANDY_PARTY_AREA_TO_ADDRESS[area].dong?.join(', ')}`}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
      <div className="flex justify-between px-24 pb-16">
        <div className="flex items-center gap-4">
          <span className="text-16 font-600 leading-[160%] text-basic-grey-700">
            내 지역이 없어요
          </span>
          <Tooltip
            position="top"
            content="현재 핸디팟은 수도권 일부 지역에서 시범 운행중이에요. 일부 지역에서는 이용이 어려운 점 알려드려요."
          />
        </div>
        {isShuttleBusAvailable && (
          <button
            type="button"
            className="rounded-6 bg-basic-grey-100 px-8 py-[6px] text-12 font-600 leading-[160%] text-basic-grey-700"
          >
            셔틀 버스로 돌아가기
          </button>
        )}
      </div>
    </div>
  );
};

export default PossibleRegionStep;
