import Link from 'next/link';
import CouponIcon from 'public/icons/coupon.svg';

const NoCoupon = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-28 ">
      <CouponIcon />
      <span className="text-16 font-400 text-grey-300">쿠폰이 없어요</span>
      <Link
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-14 font-500 text-grey-600-sub underline underline-offset-[3px]"
      >
        진행 중인 이벤트는 홈 화면 배너를 확인해주세요
      </Link>
    </div>
  );
};

export default NoCoupon;
