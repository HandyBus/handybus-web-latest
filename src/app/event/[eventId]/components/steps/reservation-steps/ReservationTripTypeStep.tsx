'use client';

import { TripType, TripTypeEnum } from '@/types/shuttleRoute.type';
import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import RequestSeatAlarmButton from '../../RequestSeatAlarmButton';
import { DANGER_SEAT_THRESHOLD } from '../../../form.const';
import { useFormContext } from 'react-hook-form';
import { useAtomValue } from 'jotai';
import { calculatePriceOfTripType, checkIsSoldOut } from '../../../event.util';
import { EventFormValues } from '../../../form.type';
import { dailyEventIdWithRoutesAtom } from '../../../store/dailyEventIdWithRoutesAtom';
import { getRouteOfHubWithInfo } from '../../../store/dailyEventIdWithHubsAtom';

interface Props {
  toReservationInfoStep: () => void;
  toExtraSeatAlarmStep: () => void;
}

const ReservationTripTypeStep = ({
  toReservationInfoStep,
  toExtraSeatAlarmStep,
}: Props) => {
  const { getValues, setValue } = useFormContext<EventFormValues>();
  const dailyEventIdWithRoutes = useAtomValue(dailyEventIdWithRoutesAtom);
  const [selectedHubWithInfo, dailyEvent] = getValues([
    'selectedHubWithInfo',
    'dailyEvent',
  ]);

  const route = getRouteOfHubWithInfo({
    hubWithInfo: selectedHubWithInfo,
    dailyEventIdWithRoutes,
    dailyEventId: dailyEvent.dailyEventId,
  });
  const { remainingSeat } = selectedHubWithInfo;
  const isSoldOut = checkIsSoldOut(remainingSeat);
  const priceOfTripType = calculatePriceOfTripType(route);

  const handleTripTypeClick = (tripType: TripType) => {
    setValue('tripType', tripType);
    toReservationInfoStep();
  };

  return (
    <section>
      {TripTypeEnum.options.map((tripType) => {
        return (
          <div key={tripType} className="relative w-full">
            <button
              type="button"
              disabled={isSoldOut}
              onClick={() => handleTripTypeClick(tripType)}
              className="group flex w-full items-center justify-between gap-8 py-12"
            >
              <span className="text-16 font-600 text-basic-grey-700 group-disabled:text-basic-grey-300">
                {TRIP_STATUS_TO_STRING[tripType]}
              </span>
              {!isSoldOut && (
                <SeatText
                  remainingSeatCount={remainingSeat[tripType]}
                  isEarlybird={priceOfTripType?.[tripType].isEarlybird}
                  regularPrice={priceOfTripType?.[tripType].regularPrice}
                  earlybirdPrice={priceOfTripType?.[tripType].earlybirdPrice}
                />
              )}
            </button>
            {isSoldOut && (
              <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-8">
                <RequestSeatAlarmButton
                  toStep={toExtraSeatAlarmStep}
                  hubWithInfo={selectedHubWithInfo}
                />
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
    <div className="flex items-center gap-8">
      <span
        className={`text-14 font-500 ${
          remainingSeatCount > DANGER_SEAT_THRESHOLD
            ? 'text-basic-grey-500'
            : 'text-basic-red-400'
        }`}
      >
        {remainingSeatCount}석 남음
      </span>
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
    </div>
  );
};
