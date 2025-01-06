import { IssuedCouponType } from '@/types/client.types';
import { ShuttleRoute } from '@/types/shuttle.types';
import { useFormContext } from 'react-hook-form';
import {
  discountAmount,
  finalPrice,
  totalPrice,
  totalRegularPrice,
} from './priceDetail.util';

interface props {
  SelectedCoupon: IssuedCouponType;
  shuttleData: ShuttleRoute[];
}

const PriceDetail = ({ SelectedCoupon, shuttleData }: props) => {
  const isDiscounted = SelectedCoupon ? true : false;
  const { getValues } = useFormContext();
  const passengerCount = getValues('passengerCount');
  const selectedCoupon = getValues('selectedCoupon');
  const tripType = getValues('tripType');
  const watchShuttleRoute = getValues('shuttleRoute');
  const currentShuttleData = shuttleData.find(
    (v) => v.shuttleRouteId === watchShuttleRoute?.value,
  );

  if (!currentShuttleData || !tripType) return;
  return (
    <dl className="flex flex-col gap-[16px]">
      <dt className="sr-only">가격 정보</dt>
      <div className="flex h-[42px] flex-row justify-between">
        <dt className="text-16 font-400 leading-[24px] text-grey-900">
          예약금액
        </dt>
        <div>
          <dd className="text-right text-16 font-400 leading-[24px] text-grey-900">
            {totalPrice({
              passengerCount,
              currentShuttleData,
              tripType,
            })?.toLocaleString()}
            원
          </dd>
          <dd className="text-12 font-400 leading-[19.2px] text-grey-900">
            (
            {totalRegularPrice({
              passengerCount: 1,
              currentShuttleData,
              tripType,
            })?.toLocaleString()}
            원 * {passengerCount}인)
          </dd>
        </div>
      </div>
      {selectedCoupon && (
        <div className="flex h-[42px] flex-row justify-between">
          <dt className="text-16 font-400 leading-[24px] text-grey-900">
            할인금액
          </dt>
          <div>
            <dd
              className={`text-right text-16 font-400 leading-[24px] ${
                isDiscounted ? 'text-primary-main' : 'text-grey-900'
              }`}
            >
              -
              {discountAmount({
                selectedCoupon,
                currentShuttleData,
                passengerCount,
                tripType,
              })?.toLocaleString()}
              원
            </dd>
            {isDiscounted && (
              <dd className="flex justify-end text-12 font-400 leading-[19.2px] text-primary-main">
                {selectedCoupon?.name}
              </dd>
            )}
          </div>
        </div>
      )}
      <div className="flex h-[42px] flex-row justify-between">
        <dt className="text-18 font-500 leading-[28.8px] text-grey-900">
          최종 결제 금액
        </dt>
        <dd className="text-22 font-600 leading-[35.2px] text-grey-900">
          {finalPrice({
            selectedCoupon,
            currentShuttleData,
            passengerCount,
            tripType,
          })?.toLocaleString()}
          원
        </dd>
      </div>
    </dl>
  );
};

export default PriceDetail;
