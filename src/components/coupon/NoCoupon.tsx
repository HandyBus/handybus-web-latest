import CouponIcon from './icons/icon-coupon.svg';

const NoCoupon = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-24 ">
      <CouponIcon />
      <span className="text-14 font-400 leading-[160%] text-basic-grey-500">
        쿠폰이 없어요
      </span>
    </div>
  );
};

export default NoCoupon;
