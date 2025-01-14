import { IssuedCoupon } from '@/types/user-management.type';

interface Props {
  coupon: IssuedCoupon;
}

const Coupon = ({ coupon }: Props) => {
  const usable = coupon.status === 'BEFORE_USE';
  const unusableReason =
    coupon.status === 'EXPIRED'
      ? '기한이 만료됨'
      : coupon.status === 'RETRIEVED'
        ? '관리자에 의해 회수됨'
        : '';
  const title =
    coupon.discountType === 'RATE'
      ? `${coupon.discountRate}%`
      : `${coupon.discountAmount?.toLocaleString()}원`;
  const parsedValidTo = new Date(coupon.validTo).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div
      className={`rounded-[12px] bg-grey-50 p-16 ${usable ? '' : 'opacity-50'}`}
    >
      {!usable && (
        <p className="pb-4 text-12 font-600 text-red-500">{unusableReason}</p>
      )}
      <h4 className="text-22 font-600">
        {title} 할인{' '}
        {coupon.discountType === 'RATE' && (
          <span className="text-12 font-400 text-grey-500">
            최대 {coupon.maxDiscountAmount?.toLocaleString()}원 할인
          </span>
        )}
      </h4>
      <p className="line-clamp-1 pb-4 pt-[2px] text-16 font-500 text-grey-800">
        {coupon.name}
      </p>
      <p className="line-clamp-1 text-12 font-400 text-grey-500">
        {coupon.maxApplicablePeople === 0
          ? '모든 탑승객에게 적용 가능'
          : `예약 당 최대 ${coupon.maxApplicablePeople}인 적용`}
      </p>
      <p className="text-12 font-400 text-grey-500">
        {parsedValidTo}까지 사용 가능
      </p>
    </div>
  );
};

export default Coupon;
