'use client';

import { TripType, TripTypeEnum } from '@/types/shuttleRoute.type';
import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import RequestSeatAlarmButton from '../components/RequestSeatAlarmButton';
import { DANGER_SEAT_THRESHOLD } from '../../../form.const';
import { useFormContext } from 'react-hook-form';
import { useAtomValue } from 'jotai';
import {
  calculatePriceOfTripType,
  checkExistingTripType,
} from '@/utils/event.util';
import { EventFormValues } from '../../../form.type';
import { dailyEventIdsWithRoutesAtom } from '../../../store/dailyEventIdsWithRoutesAtom';
import { getRouteOfHubWithInfo } from '../../../store/dailyEventIdsWithHubsAtom';

interface Props {
  toReservationInfoStep: () => void;
  toExtraSeatAlarmStep: () => void;
}

const ReservationTripTypeStep = ({
  toReservationInfoStep,
  toExtraSeatAlarmStep,
}: Props) => {
  const { getValues, setValue } = useFormContext<EventFormValues>();
  const dailyEventIdsWithRoutes = useAtomValue(dailyEventIdsWithRoutesAtom);
  const [selectedHubWithInfo, dailyEvent] = getValues([
    'selectedHubWithInfo',
    'dailyEvent',
  ]);

  const route = getRouteOfHubWithInfo({
    hubWithInfo: selectedHubWithInfo,
    dailyEventIdsWithRoutes,
    dailyEventId: dailyEvent.dailyEventId,
  });
  if (!route) {
    return null;
  }

  const { toDestinationExists, fromDestinationExists, roundTripExists } =
    checkExistingTripType(route);
  const { remainingSeat } = selectedHubWithInfo;
  const priceOfTripType = route ? calculatePriceOfTripType(route) : null;

  const handleTripTypeClick = (tripType: TripType) => {
    setValue('tripType', tripType);
    toReservationInfoStep();
  };

  return (
    <section className="flex flex-col gap-16">
      {TripTypeEnum.options.map((tripType) => {
        const remainingSeatCount = remainingSeat[tripType];
        const price = priceOfTripType?.[tripType];
        const isSoldOut = remainingSeatCount === 0;

        if (!price || !price.regularPrice || remainingSeatCount === null) {
          return null;
        }

        if (tripType === 'ROUND_TRIP' && !roundTripExists) {
          return null;
        }
        if (tripType === 'TO_DESTINATION' && !toDestinationExists) {
          return null;
        }
        if (tripType === 'FROM_DESTINATION' && !fromDestinationExists) {
          return null;
        }

        return (
          <div key={tripType} className="relative w-full">
            <button
              type="button"
              disabled={isSoldOut}
              onClick={() => handleTripTypeClick(tripType)}
              className="group flex w-full items-center justify-between gap-8"
            >
              <div className="flex flex-col items-start gap-[2px]">
                <span className="text-16 font-600 leading-[160%] text-basic-grey-700 group-disabled:text-basic-grey-300">
                  {TRIP_STATUS_TO_STRING[tripType]}
                </span>
                {remainingSeatCount > DANGER_SEAT_THRESHOLD && (
                  <span className="text-12 font-500 leading-[160%] text-basic-grey-500">
                    좌석 여유
                  </span>
                )}
                {remainingSeatCount !== null &&
                  remainingSeatCount > 0 &&
                  remainingSeatCount <= DANGER_SEAT_THRESHOLD && (
                    <span className="text-12 font-500 leading-[160%] text-basic-red-400">
                      {remainingSeatCount}석 남음
                    </span>
                  )}
                {isSoldOut && (
                  <span className="text-12 font-600 leading-[160%] text-basic-grey-500">
                    매진
                  </span>
                )}
              </div>
              {!isSoldOut && (
                <SeatText
                  remainingSeatCount={remainingSeatCount}
                  isEarlybird={price.isEarlybird}
                  regularPrice={price.regularPrice}
                  earlybirdPrice={price.earlybirdPrice}
                />
              )}
            </button>
            {isSoldOut && (
              <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-8">
                <RequestSeatAlarmButton
                  toStep={toExtraSeatAlarmStep}
                  hubWithInfo={selectedHubWithInfo}
                />
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
  remainingSeatCount: number;
  isEarlybird: boolean;
  regularPrice: number;
  earlybirdPrice: number | null;
}

const SeatText = ({
  remainingSeatCount,
  isEarlybird,
  regularPrice,
  earlybirdPrice,
}: Partial<SeatTextProps>) => {
  if (!remainingSeatCount || !regularPrice) {
    return null;
  }
  return (
    <div className="flex items-center gap-4">
      {isEarlybird ? (
        <>
          <span className="text-12 font-600 text-basic-grey-300 line-through">
            {regularPrice.toLocaleString()}원
          </span>
          <span className="text-16 font-600 text-basic-grey-700">
            {earlybirdPrice?.toLocaleString()}원
          </span>
        </>
      ) : (
        <span className="text-16 font-600 text-basic-grey-700">
          {regularPrice.toLocaleString()}원
        </span>
      )}
    </div>
  );
};
