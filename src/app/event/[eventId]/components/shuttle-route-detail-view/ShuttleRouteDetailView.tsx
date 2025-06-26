'use client';

import Tabs from '@/components/tab/Tabs';
import { useEffect, useMemo, useRef, useState } from 'react';
import InfoIcon from '../../icons/info.svg';
import { TripTypeWithoutRoundTrip } from './shuttleRouteDetailView.type';
import RouteLine from './components/RouteLine';
import Hubs from './components/Hubs';
import { useAtomValue } from 'jotai';
import {
  isCheckRouteDetailViewFlowAtom,
  selectedHubWithInfoForDetailViewAtom,
} from '../../store/selectedHubWithInfoForDetailViewAtom';
import { dailyEventIdsWithRoutesAtom } from '../../store/dailyEventIdsWithRoutesAtom';
import { getRouteOfHubWithInfo } from '../../store/dailyEventIdsWithHubsAtom';

const TAXI_HUB_PREFIX = process.env.NEXT_PUBLIC_TAXI_HUB_NAME;

// eventDestination: 행사 도착지
// primary: 선택된 정류장
// secondary: 경유 정류장 (유저 입장)
// tertiary: 경유하지 않는 정류장 (유저 입장)

const ShuttleRouteDetailView = () => {
  const [currentTab, setCurrentTab] =
    useState<TripTypeWithoutRoundTrip>('TO_DESTINATION');
  const [openedHubIndexes, setOpenedHubIndexes] = useState<number[]>([]);

  const handleChangeTab = (value: TripTypeWithoutRoundTrip) => {
    setCurrentTab(value);
    setOpenedHubIndexes([]);
  };

  const addOpenedHubIndex = (index: number) => {
    setOpenedHubIndexes((prev) => [...prev, index]);
  };
  const removeOpenedHubIndex = (index: number) => {
    setOpenedHubIndexes((prev) => prev.filter((i) => i !== index));
  };

  const isCheckRouteDetailViewFlow = useAtomValue(
    isCheckRouteDetailViewFlowAtom,
  );
  const selectedHubWithInfoForDetailView = useAtomValue(
    selectedHubWithInfoForDetailViewAtom,
  );
  const dailyEventIdsWithRoutes = useAtomValue(dailyEventIdsWithRoutesAtom);

  const shuttleRoute = selectedHubWithInfoForDetailView
    ? getRouteOfHubWithInfo({
        hubWithInfo: selectedHubWithInfoForDetailView.hubWithInfo,
        dailyEventIdsWithRoutes,
        dailyEventId: selectedHubWithInfoForDetailView.dailyEvent.dailyEventId,
      })
    : null;

  const selectedHubName = selectedHubWithInfoForDetailView?.hubWithInfo.name;
  const toDestinationHubs = useMemo(
    () =>
      shuttleRoute?.toDestinationShuttleRouteHubs
        ? shuttleRoute.toDestinationShuttleRouteHubs.toSorted(
            (a, b) => a.sequence - b.sequence,
          )
        : [],
    [shuttleRoute],
  );
  const fromDestinationHubs = useMemo(
    () =>
      shuttleRoute?.fromDestinationShuttleRouteHubs
        ? shuttleRoute.fromDestinationShuttleRouteHubs.toSorted(
            (a, b) => a.sequence - b.sequence,
          )
        : [],
    [shuttleRoute],
  );
  const selectedToDestinationHubIndex = useMemo(
    () =>
      toDestinationHubs.findIndex(
        (hub) =>
          hub.regionHubId ===
          selectedHubWithInfoForDetailView?.hubWithInfo.regionHubId,
      ),
    [toDestinationHubs, selectedHubWithInfoForDetailView],
  );
  const selectedFromDestinationHubIndex = useMemo(
    () =>
      fromDestinationHubs.findIndex(
        (hub) =>
          hub.regionHubId ===
          selectedHubWithInfoForDetailView?.hubWithInfo.regionHubId,
      ),
    [fromDestinationHubs, selectedHubWithInfoForDetailView],
  );

  useEffect(() => {
    if (!shuttleRoute) {
      return;
    }

    if (toDestinationHubs.length === 0) {
      setCurrentTab('FROM_DESTINATION');
    } else {
      setCurrentTab('TO_DESTINATION');
    }
  }, [shuttleRoute, toDestinationHubs, fromDestinationHubs]);

  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollToSection = () => {
    if (sectionRef.current) {
      const elementPosition = sectionRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - 50;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (isCheckRouteDetailViewFlow && selectedHubWithInfoForDetailView) {
      scrollToSection();
    }
  }, [isCheckRouteDetailViewFlow, selectedHubWithInfoForDetailView]);

  if (!selectedHubWithInfoForDetailView) {
    return null;
  }

  // TODO: 임시로 핸디팟 노선 처리
  const isTaxiRoute = !!(
    !!TAXI_HUB_PREFIX &&
    !!shuttleRoute &&
    (shuttleRoute.toDestinationShuttleRouteHubs?.some((hub) =>
      hub.name?.includes(TAXI_HUB_PREFIX),
    ) ||
      shuttleRoute.fromDestinationShuttleRouteHubs?.some((hub) =>
        hub.name?.includes(TAXI_HUB_PREFIX),
      ))
  );

  return (
    <div ref={sectionRef}>
      <div className="h-8 w-full bg-basic-grey-50" />
      <section className="px-16 py-24">
        <h3 className="pb-16 text-20 font-700">
          <span className="text-brand-primary-400">{selectedHubName}</span>을
          지나는 노선이에요
        </h3>
        <Tabs
          items={
            [
              {
                label: '가는 편',
                value: 'TO_DESTINATION',
                disabled: toDestinationHubs.length === 0,
              },
              {
                label: '오는 편',
                value: 'FROM_DESTINATION',
                disabled: fromDestinationHubs.length === 0,
              },
            ] as const
          }
          selected={currentTab}
          onSelect={handleChangeTab}
        />
        <div className="my-16 grid grid-cols-[20px_1fr] gap-4 rounded-6 bg-basic-grey-50 p-8">
          <InfoIcon />
          <p className="text-12 font-500 text-basic-grey-600">
            배차 과정에서 추가 정류지가 생기거나 정차 시각이 변경될 수 있어요.
            변동이 생기면 미리 알려드릴게요.
          </p>
        </div>
        <div className="flex w-full gap-[6px]">
          <div className="flex w-12 shrink-0 flex-col items-center pt-[23.6px]">
            <RouteLine
              hubs={
                currentTab === 'TO_DESTINATION'
                  ? toDestinationHubs
                  : fromDestinationHubs
              }
              selectedHubIndex={
                currentTab === 'TO_DESTINATION'
                  ? selectedToDestinationHubIndex
                  : selectedFromDestinationHubIndex
              }
              tripType={currentTab}
              openedHubIndexes={openedHubIndexes}
            />
          </div>
          <div className="flex flex-1 flex-col">
            <Hubs
              hubs={
                currentTab === 'TO_DESTINATION'
                  ? toDestinationHubs
                  : fromDestinationHubs
              }
              selectedHubIndex={
                currentTab === 'TO_DESTINATION'
                  ? selectedToDestinationHubIndex
                  : selectedFromDestinationHubIndex
              }
              tripType={currentTab}
              addOpenedHubIndex={addOpenedHubIndex}
              removeOpenedHubIndex={removeOpenedHubIndex}
              isTaxiRoute={isTaxiRoute}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShuttleRouteDetailView;
