import { IssuedCouponsViewEntity } from '@/types/coupon.type';
import dayjs from 'dayjs';

interface Props {
  coupon: IssuedCouponsViewEntity;
}

const Coupon = ({ coupon }: Props) => {
  const usable = coupon.status === 'BEFORE_USE';
  const unusableReason =
    coupon.status === 'EXPIRED'
      ? '기간 만료'
      : coupon.status === 'RETRIEVED'
        ? '사용이 제한된 쿠폰'
        : '';
  const title =
    coupon.discountType === 'RATE'
      ? `${coupon.discountRate}%`
      : `${coupon.discountAmount?.toLocaleString()}원`;
  const parsedValidTo = dayjs(coupon.validTo)
    .subtract(1, 'minute')
    .format('YYYY년 M월 D일 H시 m분');

  return (
    <div
      className={`rounded-8 p-16 ${usable ? '' : 'opacity-50'} border border-basic-grey-200`}
    >
      <p className="line-clamp-1 text-14 font-600 leading-[160%] text-basic-grey-700">
        {`[${coupon.name}] ${title} 할인`}
      </p>
      {coupon.discountType === 'RATE' && (
        <p className="text-12 font-500 leading-[160%] text-basic-grey-700">
          최대 {coupon.maxDiscountAmount?.toLocaleString()}원 할인
        </p>
      )}
      <p className="line-clamp-1 text-12 font-500 leading-[160%] text-basic-grey-700">
        {coupon.maxApplicablePeople === 0
          ? '모든 탑승객에게 적용 가능'
          : `예약 당 최대 ${coupon.maxApplicablePeople}인 적용`}
      </p>
      <p className="text-12 font-500 leading-[160%] text-basic-grey-500">
        {usable ? `${parsedValidTo}까지 사용 가능` : unusableReason}
      </p>
    </div>
  );
};

export default Coupon;
