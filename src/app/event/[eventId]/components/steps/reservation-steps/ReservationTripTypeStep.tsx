'use client';

import { ShuttleRoutesViewEntity, TripType } from '@/types/shuttleRoute.type';
import { MOCK_SHUTTLE_ROUTE } from '../../../mock.const';
import { compareToNow } from '@/utils/dateString.util';
import { useMemo } from 'react';
import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import RequestSeatAlarmButton from '../../RequestSeatAlarmButton';
import { DANGER_SEAT_THRESHOLD } from '../../../form.const';

interface TripTypeWithValues {
  type: TripType;
  remainingSeatCount: number;
  isEarlybird: boolean;
  regularPrice: number;
  earlybirdPrice: number | null;
}

interface Props {
  toReservationInfoStep: () => void;
  toExtraSeatAlarmStep: () => void;
}

const ReservationTripTypeStep = ({
  toReservationInfoStep,
  toExtraSeatAlarmStep,
}: Props) => {
  const shuttleRoute = MOCK_SHUTTLE_ROUTE;

  const tripTypeWithValues = useMemo(
    () => calculateTripType(shuttleRoute),
    [shuttleRoute],
  );

  return (
    <section>
      {tripTypeWithValues.map((trip) => {
        const isSoldOut = trip.remainingSeatCount === 0;
        return (
          <div key={trip.type} className="relative w-full">
            <button
              type="button"
              disabled={isSoldOut}
              onClick={toReservationInfoStep}
              className="flex w-full items-center justify-between gap-8 py-12"
            >
              <span className="text-16 font-600 text-basic-grey-700">
                {TRIP_STATUS_TO_STRING[trip.type]}
              </span>
              {!isSoldOut && <SeatText trip={trip} />}
            </button>
            {isSoldOut && (
              <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-8">
                <RequestSeatAlarmButton toStep={toExtraSeatAlarmStep} />
                <span className="text-14 font-600 text-basic-grey-500">
                  매진
                </span>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ReservationTripTypeStep;

interface SeatTextProps {
  trip: TripTypeWithValues;
}

const SeatText = ({ trip }: SeatTextProps) => {
  return (
    <div className="flex items-center gap-8">
      <span
        className={`text-14 font-500 ${
          trip.remainingSeatCount > DANGER_SEAT_THRESHOLD
            ? 'text-basic-grey-500'
            : 'text-basic-red-400'
        }`}
      >
        {trip.remainingSeatCount}석 남음
      </span>
      <div className="flex items-center gap-4">
        {trip.isEarlybird ? (
          <>
            <span className="text-12 font-600 text-basic-grey-300 line-through">
              {trip.regularPrice.toLocaleString()}원
            </span>
            <span className="text-16 font-600 text-basic-grey-700">
              {trip.earlybirdPrice?.toLocaleString()}원
            </span>
          </>
        ) : (
          <span className="text-16 font-600 text-basic-grey-700">
            {trip.regularPrice.toLocaleString()}원
          </span>
        )}
      </div>
    </div>
  );
};

const calculateTripType = (
  shuttleRoute: ShuttleRoutesViewEntity,
): TripTypeWithValues[] => {
  // 남은 좌석 수 계산
  const maxSeatCount = shuttleRoute?.maxPassengerCount ?? 0;
  const toDestinationCount =
    maxSeatCount - (shuttleRoute?.toDestinationCount ?? 0);
  const fromDestinationCount =
    maxSeatCount - (shuttleRoute?.fromDestinationCount ?? 0);
  const roundTripCount = Math.min(toDestinationCount, fromDestinationCount);

  // 가격 계산
  const isEarlybird =
    shuttleRoute?.hasEarlybird && shuttleRoute?.earlybirdDeadline
      ? compareToNow(shuttleRoute.earlybirdDeadline, (a, b) => a > b)
      : false;
  const {
    regularPriceRoundTrip = 0,
    regularPriceToDestination = 0,
    regularPriceFromDestination = 0,
    earlybirdPriceRoundTrip = 0,
    earlybirdPriceToDestination = 0,
    earlybirdPriceFromDestination = 0,
  } = shuttleRoute;

  const calculatedTripType: {
    type: TripType;
    remainingSeatCount: number;
    isEarlybird: boolean;
    regularPrice: number;
    earlybirdPrice: number | null;
  }[] = [
    {
      type: 'ROUND_TRIP',
      remainingSeatCount: roundTripCount,
      isEarlybird,
      regularPrice: regularPriceRoundTrip,
      earlybirdPrice: earlybirdPriceRoundTrip,
    },
    {
      type: 'TO_DESTINATION',
      remainingSeatCount: toDestinationCount,
      isEarlybird,
      regularPrice: regularPriceToDestination,
      earlybirdPrice: earlybirdPriceToDestination,
    },
    {
      type: 'FROM_DESTINATION',
      remainingSeatCount: fromDestinationCount,
      isEarlybird,
      regularPrice: regularPriceFromDestination,
      earlybirdPrice: earlybirdPriceFromDestination,
    },
  ];

  return calculatedTripType;
};
