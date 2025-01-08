'use client';

import Select from '@/components/select/Select';
import {
  DailyShuttleType,
  ShuttleRouteType,
  ShuttleType,
} from '@/types/shuttle.types';
import { compareToNow, parseDateString } from '@/utils/dateString';
import { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import RouteVisualizer from '@/components/route-visualizer/RouteVisualizer';
import { useGetRoutes } from '@/services/shuttleOperation';
import BottomBar from './BottomBar';
import PriceStats from './PriceStats';

interface Props {
  shuttle: ShuttleType;
  initialDailyShuttleId: number;
  initialRouteId: number;
}

const ReservationForm = ({
  shuttle,
  initialDailyShuttleId,
  initialRouteId,
}: Props) => {
  const [selectedDailyShuttle, setSelectedDailyShuttle] =
    useState<DailyShuttleType>();
  const [selectedRoute, setSelectedRoute] = useState<ShuttleRouteType>();

  const { data: routes } = useGetRoutes(
    shuttle.shuttleId,
    selectedDailyShuttle?.dailyShuttleId ?? initialDailyShuttleId,
  );

  useEffect(() => {
    if (selectedDailyShuttle || selectedRoute || !routes) {
      return;
    }
    setSelectedDailyShuttle(
      shuttle.dailyShuttles.find(
        (dailyShuttle) => dailyShuttle.dailyShuttleId === initialDailyShuttleId,
      ),
    );
    setSelectedRoute(
      routes.find((route) => route.shuttleRouteId === initialRouteId),
    );
  }, [routes]);

  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (!selectedDailyShuttle || !selectedRoute) {
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set(
      'dailyShuttleId',
      selectedDailyShuttle.dailyShuttleId.toString(),
    );
    params.set('shuttleRouteId', selectedRoute?.shuttleRouteId.toString());

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [selectedRoute]);

  const filteredRoutes = useMemo(
    () =>
      routes?.filter(
        (route) =>
          route.dailyShuttleId === selectedDailyShuttle?.dailyShuttleId,
      ),
    [routes, selectedDailyShuttle],
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      dailyShuttleId: selectedDailyShuttle?.dailyShuttleId?.toString() ?? '',
      shuttleRouteId: selectedRoute?.shuttleRouteId?.toString() ?? '',
    });
    router.push(`/reservation/${shuttle.shuttleId}/write?${query}`);
  };

  const sortedToDestinationHubs = useMemo(
    () =>
      selectedRoute?.hubs.toDestination.sort(
        (a, b) => a.sequence - b.sequence,
      ) ?? [],
    [selectedRoute],
  );

  return (
    <form onSubmit={handleSubmit}>
      <section className="flex flex-col gap-16 p-16">
        <h5 className="text-16 font-400 text-grey-600-sub">
          운행일을 선택해주세요
        </h5>
        <Select
          options={shuttle.dailyShuttles}
          value={selectedDailyShuttle}
          setValue={(value) => {
            setSelectedDailyShuttle(value);
            setSelectedRoute(undefined);
          }}
          renderValue={(value) => parseDateString(value.date)}
          placeholder="운행일"
          bottomSheetTitle="운행일 선택"
          isUnderLined
        />
      </section>
      <section className="flex flex-col gap-16 p-16">
        <h5 className="text-16 font-400 text-grey-600-sub">
          노선 종류를 선택해주세요
        </h5>
        <Select
          options={filteredRoutes ?? []}
          value={selectedRoute}
          setValue={(value) => {
            setSelectedRoute(value);
          }}
          renderValue={(value) => value.name}
          disabled={!selectedDailyShuttle}
          placeholder="노선 종류"
          bottomSheetTitle="노선 종류 선택"
          isUnderLined
        />
      </section>
      <div id="divider" className="my-16 h-[8px] bg-grey-50" />
      {selectedRoute && (
        <>
          <RouteVisualizer
            type="ROUND_TRIP"
            isSelected={false}
            toDestinationHubs={selectedRoute.hubs.toDestination}
            fromDestinationHubs={selectedRoute.hubs.fromDestination}
          />
          <PriceStats
            tripType={selectedRoute.remainingSeatType}
            region={sortedToDestinationHubs[0].name}
            destination={
              sortedToDestinationHubs[sortedToDestinationHubs.length - 1].name
            }
            regularPrice={{
              toDestination: selectedRoute.regularPriceToDestination,
              fromDestination: selectedRoute.regularPriceFromDestination,
              roundTrip: selectedRoute.regularPriceRoundTrip,
            }}
            isEarlybird={Boolean(
              selectedRoute.hasEarlybird &&
                selectedRoute.earlybirdDeadline &&
                compareToNow(selectedRoute.earlybirdDeadline, (a, b) => a > b),
            )}
            earlybirdDeadline={selectedRoute.earlybirdDeadline}
            earlybirdPrice={{
              toDestination: selectedRoute.earlybirdPriceToDestination,
              fromDestination: selectedRoute.earlybirdPriceFromDestination,
              roundTrip: selectedRoute.earlybirdPriceRoundTrip,
            }}
          />
        </>
      )}
      <BottomBar
        disabled={!selectedRoute || selectedRoute.status !== 'OPEN'}
        shuttleName={shuttle.name}
      />
    </form>
  );
};

export default ReservationForm;
