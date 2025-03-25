'use client';

import { ShuttleRoutesViewEntity, TripType } from '@/types/shuttleRoute.type';
import { MOCK_SHUTTLE_ROUTE } from '../../../mock.const';
import { compareToNow } from '@/utils/dateString.util';
import { useMemo } from 'react';
import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import RequestSeatAlarmButton from '../../RequestSeatAlarmButton';
import { DANGER_SEAT_THRESHOLD } from '../../../constants.const';

const ReservationTripTypeStep = () => {
  const shuttleRoute = MOCK_SHUTTLE_ROUTE;

  const tripTypeWithValues = useMemo(
    () => calculateTripType(shuttleRoute),
    [shuttleRoute],
  );

  return (
    <section>
      {tripTypeWithValues.map((tripType) => {
        const isSoldOut = tripType.remainingSeatCount === 0;
        return (
          <button
            key={tripType.type}
            type="button"
            disabled={isSoldOut}
            className="flex w-full items-center justify-between gap-8 py-12"
          >
            <span className="text-16 font-600 text-basic-grey-700">
              {TRIP_STATUS_TO_STRING[tripType.type]}
            </span>
            <div className="flex items-center gap-8">
              {isSoldOut ? (
                <>
                  <RequestSeatAlarmButton />
                  <span className="text-14 font-600 text-basic-grey-500">
                    매진
                  </span>
                </>
              ) : (
                <>
                  <span
                    className={`text-14 font-500 ${
                      tripType.remainingSeatCount > DANGER_SEAT_THRESHOLD
                        ? 'text-basic-grey-500'
                        : 'text-basic-red-400'
                    }`}
                  >
                    {tripType.remainingSeatCount}석 남음
                  </span>
                  <div className="flex items-center gap-4">
                    {tripType.isEarlybird ? (
                      <>
                        <span className="text-12 font-600 text-basic-grey-300 line-through">
                          {tripType.regularPrice.toLocaleString()}원
                        </span>
                        <span className="text-16 font-600 text-basic-grey-700">
                          {tripType.earlybirdPrice?.toLocaleString()}원
                        </span>
                      </>
                    ) : (
                      <span className="text-16 font-600 text-basic-grey-700">
                        {tripType.regularPrice.toLocaleString()}원
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          </button>
        );
      })}
    </section>
  );
};

export default ReservationTripTypeStep;

const calculateTripType = (shuttleRoute: ShuttleRoutesViewEntity) => {
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

  const sortedCalculatedTripType = calculatedTripType.sort((a, b) => {
    if (a.remainingSeatCount === 0 && b.remainingSeatCount === 0) {
      const typeOrder = {
        TO_DESTINATION: 0,
        FROM_DESTINATION: 1,
        ROUND_TRIP: 2,
      };
      return typeOrder[a.type] - typeOrder[b.type];
    }
    if (a.remainingSeatCount === 0) {
      return 1;
    }
    if (b.remainingSeatCount === 0) {
      return -1;
    }
    return 0;
  });

  return sortedCalculatedTripType;
};
