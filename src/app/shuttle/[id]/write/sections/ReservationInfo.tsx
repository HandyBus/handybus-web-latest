import { ShuttleRouteType } from '@/types/shuttle.types';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  shuttleData: ShuttleRouteType[];
}

const ReservationInfo = ({ shuttleData }: Props) => {
  const { getValues } = useFormContext();
  const dailyShuttle = getValues('dailyShuttle');
  const shuttleRoute = getValues('shuttleRoute');
  const ShuttleDataSelected = shuttleData?.find(
    (v) => v.shuttleRouteId === shuttleRoute?.value,
  );
  const tripType = getValues('tripType');
  const passengers = getValues('passengers');
  const pickupHub = ShuttleDataSelected?.hubs.toDestination.find(
    (v) => v.shuttleRouteHubId === getValues('toDestinationHubId'),
  );
  const dropoffHub = ShuttleDataSelected?.hubs.fromDestination.find(
    (v) => v.shuttleRouteHubId === getValues('fromDestinationHubId'),
  );

  const explainTripType = useMemo(() => {
    if (!tripType) return '';
    if (tripType.value === 'ROUND_TRIP') return '왕복';
    if (tripType.value === 'TO_DESTINATION') return '편도 (귀가행)';
    if (tripType.value === 'FROM_DESTINATION') return '편도 (출발행)';
  }, [tripType]);

  return (
    <section className="flex flex-col gap-[16px] px-16 py-28">
      <h2 className="text-22 font-700 leading-[30.8px] text-grey-900">
        예약내역을 확인해주세요
      </h2>
      <div className="grid grid-cols-[80px_1fr] gap-x-32 gap-y-12">
        <div className="text-16 font-400 leading-[24px] text-grey-600">
          탑승일
        </div>
        <div className="text-14 font-500 leading-[24px] text-grey-900">
          {dailyShuttle?.label}
        </div>

        <div className="text-16 font-400 leading-[24px] text-grey-600">
          노선 종류
        </div>
        <div className="text-14 font-500 leading-[24px] text-grey-900">
          {ShuttleDataSelected?.name}
        </div>

        <div className="text-16 font-400 leading-[24px] text-grey-600">
          왕복 여부
        </div>
        <div className="text-14 font-500 leading-[24px] text-grey-900">
          {explainTripType}
        </div>

        {(tripType?.value === 'ROUND_TRIP' ||
          tripType?.value === 'TO_DESTINATION') && (
          <>
            <div className="text-16 font-400 leading-[24px] text-grey-600">
              탑승 장소
            </div>
            <div className="text-14 font-500 leading-[24px] text-grey-900">
              {pickupHub?.name}
            </div>
          </>
        )}

        {(tripType?.value === 'ROUND_TRIP' ||
          tripType?.value === 'FROM_DESTINATION') && (
          <>
            <div className="text-16 font-400 leading-[24px] text-grey-600">
              하차 장소
            </div>
            <div className="text-14 font-500 leading-[24px] text-grey-900">
              {dropoffHub?.name}
            </div>
          </>
        )}

        <div className="text-16 font-400 leading-[24px] text-grey-600">
          탑승객 수
        </div>
        <div className="text-14 font-500 leading-[24px] text-grey-900">
          {passengers?.length}명
        </div>
      </div>
    </section>
  );
};

export default ReservationInfo;
