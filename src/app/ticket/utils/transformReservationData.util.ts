import { ReservationsViewEntity } from '@/types/reservation.type';
import { TripType } from '@/types/shuttleRoute.type';

export interface TransformedReservationData {
  reservationId: string;
  isRoundTrip: boolean;
  tripType: TripType;
  departureTime: string;
  departureLocation: string;
  eventName: string;
  passengerCount: number;
}

/**
 * 왕복노선을 편도노선으로 분리하여 반환합니다.
 * @param reservations - Array of reservation entities
 * @returns Array of transformed reservation data
 */
export const transformReservationData = (
  reservations: ReservationsViewEntity[],
): TransformedReservationData[] => {
  const transformedData: TransformedReservationData[] = [];

  reservations.forEach((reservation) => {
    const { type, shuttleRoute, passengerCount } = reservation;
    const eventName = shuttleRoute.event.eventName;

    if (type === 'ROUND_TRIP') {
      // 1. 행사장행 (TO_DESTINATION)
      const toDestinationHub = shuttleRoute.toDestinationShuttleRouteHubs?.find(
        (hub) =>
          hub.shuttleRouteHubId === reservation.toDestinationShuttleRouteHubId,
      );

      if (toDestinationHub) {
        transformedData.push({
          reservationId: reservation.reservationId,
          isRoundTrip: true,
          tripType: 'TO_DESTINATION',
          departureTime: toDestinationHub.arrivalTime,
          departureLocation: toDestinationHub.name,
          eventName,
          passengerCount,
        });
      }

      // 2. 귀가행 (FROM_DESTINATION)
      const fromDestinationHub =
        shuttleRoute.fromDestinationShuttleRouteHubs?.find(
          (hub) => hub.role === 'DESTINATION',
        );

      if (fromDestinationHub) {
        transformedData.push({
          reservationId: reservation.reservationId,
          isRoundTrip: true,
          tripType: 'FROM_DESTINATION',
          departureTime: fromDestinationHub.arrivalTime,
          departureLocation: shuttleRoute.event.eventLocationName,
          eventName,
          passengerCount,
        });
      }
    } else {
      let departureTime = '';
      let departureLocation = '';

      if (type === 'TO_DESTINATION') {
        const hub = shuttleRoute.toDestinationShuttleRouteHubs?.find(
          (hub) =>
            hub.shuttleRouteHubId ===
            reservation.toDestinationShuttleRouteHubId,
        );
        if (hub) {
          departureTime = hub.arrivalTime;
          departureLocation = hub.name;
        }
      } else if (type === 'FROM_DESTINATION') {
        const hub = shuttleRoute.fromDestinationShuttleRouteHubs?.find(
          (hub) => hub.role === 'DESTINATION',
        );
        if (hub) {
          departureTime = hub.arrivalTime;
          departureLocation = shuttleRoute.event.eventLocationName;
        }
      }

      transformedData.push({
        reservationId: reservation.reservationId,
        isRoundTrip: false,
        tripType: type,
        departureTime,
        departureLocation,
        eventName,
        passengerCount,
      });
    }
  });

  return transformedData;
};
