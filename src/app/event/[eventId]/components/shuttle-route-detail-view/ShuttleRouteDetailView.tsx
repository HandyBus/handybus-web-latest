'use client';

import Tabs from '@/components/tab/Tabs';
import { useState } from 'react';
import InfoIcon from '../../icons/info.svg';
import { MOCK_SHUTTLE_ROUTE } from './mock.const';
import { TripTypeWithoutRoundTrip } from './shuttleRouteDetailView.type';
import RouteLine from './components/RouteLine';
import Hubs from './components/Hubs';

// eventLocation: 이벤트 장소
// primary: 선택된 정류장
// secondary: 경유 정류장 (유저 입장)
// tertiary: 경유하지 않는 정류장 (유저 입장)

const ShuttleRouteDetailView = () => {
  const [currentTab, setCurrentTab] =
    useState<TripTypeWithoutRoundTrip>('TO_DESTINATION');

  const shuttleRoute = MOCK_SHUTTLE_ROUTE;
  const sortedHubs =
    currentTab === 'TO_DESTINATION'
      ? (shuttleRoute.toDestinationShuttleRouteHubs?.toSorted(
          (a, b) => a.sequence - b.sequence,
        ) ?? [])
      : (shuttleRoute.fromDestinationShuttleRouteHubs?.toSorted(
          (a, b) => a.sequence - b.sequence,
        ) ?? []);
  const selectedHubIndex = 1;

  return (
    <>
      <div className="h-8 w-full bg-basic-grey-50" />
      <section className="px-16 py-24">
        <h3 className="pb-16 text-20 font-700">
          <span className="text-brand-primary-400">양재역</span>을 지나는
          노선이에요
        </h3>
        <Tabs
          items={
            [
              { label: '가는 편', value: 'TO_DESTINATION' },
              { label: '오는 편', value: 'FROM_DESTINATION' },
            ] as const
          }
          selected={currentTab}
          onSelect={(value) => {
            setCurrentTab(value);
          }}
        />
        <div className="my-16 grid grid-cols-[20px_1fr] gap-4 rounded-6 bg-basic-grey-50 p-8">
          <InfoIcon />
          <p className="text-12 font-500 text-basic-grey-600">
            배차 과정에서 추가 정류지가 생기거나 정차 시각이 변경될 수 있어요.
            변동이 생기면 미리 알려드릴게요.
          </p>
        </div>
        <div className="flex w-full gap-12">
          <div className="flex w-12 shrink-0 flex-col items-center pt-[7px]">
            <RouteLine
              hubs={sortedHubs}
              selectedHubIndex={selectedHubIndex}
              tripType={currentTab}
            />
          </div>
          <div className="flex flex-1 flex-col gap-12">
            <Hubs
              hubs={sortedHubs}
              selectedHubIndex={selectedHubIndex}
              tripType={currentTab}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ShuttleRouteDetailView;
