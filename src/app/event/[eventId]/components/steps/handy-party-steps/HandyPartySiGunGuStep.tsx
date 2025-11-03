import { useAtomValue } from 'jotai';
import { EventFormValues } from '../../../form.type';
import { useFormContext } from 'react-hook-form';
import { dailyEventIdsWithRoutesAtom } from '../../../store/dailyEventIdsWithRoutesAtom';
import Tooltip from '@/components/tooltip/Tooltip';
import {
  HANDY_PARTY_AREA_TO_ADDRESS,
  HandyPartyRouteArea,
} from '@/constants/handyPartyArea.const';
import { useMemo, useState } from 'react';
import { dailyEventIdsWithHubsAtom } from '../../../store/dailyEventIdsWithHubsAtom';
import { HANDY_PARTY_PREFIX } from '@/constants/common';
import HandyPartyModal from '../../handy-party/HandyPartyModal';

interface Props {
  closeBottomSheet: () => void;
}

const HandyPartySiGunGuStep = ({ closeBottomSheet }: Props) => {
  const { getValues } = useFormContext<EventFormValues>();
  const dailyEventIdsWithHubs = useAtomValue(dailyEventIdsWithHubsAtom);
  const dailyEventIdsWithRoutes = useAtomValue(dailyEventIdsWithRoutesAtom);

  const [dailyEvent, openSido, sido] = getValues([
    'dailyEvent',
    'openSido',
    'sido',
  ]);
  const routes = dailyEventIdsWithRoutes?.[dailyEvent.dailyEventId];

  const handyPartyRoutes = routes.filter((route) =>
    route.name.includes(HANDY_PARTY_PREFIX),
  );

  const prioritySido = openSido ?? sido;
  const slicedPrioritySido = prioritySido.slice(0, 2); // 서울특별시 -> 서울, 경기도 -> 경기
  const possibleHandyPartyAreas = useMemo(
    () =>
      handyPartyRoutes.reduce((acc, route) => {
        // 어드민에서 핸디팟 노선들을 형식에 맞추어 만들어야함
        const area = route.name.split('_')[1] as HandyPartyRouteArea;
        if (HANDY_PARTY_AREA_TO_ADDRESS[area].sido !== slicedPrioritySido)
          return acc;
        const existingArea = acc.find((a) => a === area);
        if (existingArea) {
          return acc;
        } else {
          return [...acc, area];
        }
      }, [] as HandyPartyRouteArea[]),
    [handyPartyRoutes, slicedPrioritySido],
  );

  const { isShuttleBusAvailable } = useMemo(() => {
    if (!dailyEventIdsWithHubs) {
      return {
        isShuttleBusAvailable: false,
      };
    }

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
      isShuttleBusAvailable,
    };
  }, [getValues, dailyEventIdsWithHubs]);

  const handleSelectArea = (area: HandyPartyRouteArea) => {
    setSelectedArea(area);
    setIsHandyPartyModalOpen(true);
  };

  const [isHandyPartyModalOpen, setIsHandyPartyModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] =
    useState<HandyPartyRouteArea>('동북권');

  return (
    <>
      {isHandyPartyModalOpen && (
        <HandyPartyModal
          closeModal={() => setIsHandyPartyModalOpen(false)}
          closeBottomSheet={closeBottomSheet}
          selectedArea={selectedArea}
          handyPartyRoutes={handyPartyRoutes}
          possibleHandyPartyAreas={possibleHandyPartyAreas}
        />
      )}
      <section className="flex flex-col gap-12">
        <ul className="flex w-full flex-1 flex-col gap-8 overflow-y-auto">
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
        <div className="flex justify-between border-t border-basic-grey-200 py-16">
          <div className="flex items-center gap-4">
            <span className="text-16 font-600 leading-[160%] text-basic-grey-700">
              내 지역이 없어요
            </span>
            <Tooltip content="현재 핸디팟은 수도권 일부 지역에서 시범 운행중이에요. 일부 지역에서는 이용이 어려운 점 알려드려요." />
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
      </section>
    </>
  );
};

export default HandyPartySiGunGuStep;
