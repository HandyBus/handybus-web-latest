import dayjs from 'dayjs';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';

/**
 * 셔틀 루트에서 가장 빠른 행사장 도착/행사장에서 출발 시간을 계산하는 유틸리티 함수
 * @param routes - 셔틀 루트 배열
 * @returns 가장 빠른 도착 시간과 출발 시간
 */
export const getEarliestDestinationTime = (
  routes: ShuttleRoutesViewEntity[],
) => {
  let earliestDestinationArrival = '';
  let earliestDestinationDeparture = '';

  routes.forEach((route) => {
    if (
      route.toDestinationShuttleRouteHubs &&
      route.regularPriceToDestination !== null &&
      route.regularPriceToDestination > 0
    ) {
      const destinationHub = route.toDestinationShuttleRouteHubs.find(
        (hub) => hub.role === 'DESTINATION',
      );
      if (destinationHub) {
        const arrivalTime = dayjs(destinationHub.arrivalTime);
        if (
          !earliestDestinationArrival ||
          dayjs(earliestDestinationArrival).isAfter(arrivalTime)
        ) {
          earliestDestinationArrival = destinationHub.arrivalTime;
        }
      }
    }

    if (
      route.fromDestinationShuttleRouteHubs &&
      route.regularPriceFromDestination !== null &&
      route.regularPriceFromDestination > 0
    ) {
      const destinationHub = route.fromDestinationShuttleRouteHubs.find(
        (hub) => hub.role === 'DESTINATION',
      );
      if (destinationHub) {
        const departureTime = dayjs(destinationHub.arrivalTime);
        if (
          !earliestDestinationDeparture ||
          dayjs(earliestDestinationDeparture).isAfter(departureTime)
        ) {
          earliestDestinationDeparture = destinationHub.arrivalTime;
        }
      }
    }
  });

  return { earliestDestinationArrival, earliestDestinationDeparture };
};
