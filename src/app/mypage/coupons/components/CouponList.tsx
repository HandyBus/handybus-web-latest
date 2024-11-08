'use client';

import CouponIcon from 'public/icons/coupon.svg';
import Link from 'next/link';
import Coupon from './Coupon';
import CheckBox from '@/components/buttons/checkbox/CheckBox';
import { useState } from 'react';

const MOCK_COUPONS = [
  {
    amount: '50%',
    title: '핸디 감사 쿠폰 (2024-08-ATEEZ-부산)',
    description: '예약 당 최대 1인 적용',
    expireDate: '2024. 12. 31. 23:59',
  },
  {
    amount: '1000원',
    title: '2023 하반기 인스타그램 홍보 이벤트',
    expireDate: '2023. 07. 09. 23:59',
    unusable: '기한이 만료됨',
  },
  {
    amount: '1000원',
    title: '2023 하반기 블로그 구독 이벤트',
    expireDate: '2023. 07. 09. 23:59',
    unusable: '관리자에 의해 회수됨',
  },
];

const CouponList = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <section className="px-16 py-28">
      <div className="mb-16 flex items-center justify-between font-400 text-grey-500">
        <span>보유한 쿠폰 (0)</span>
        <button
          onClick={() => setIsChecked((prev) => !prev)}
          className="flex items-center gap-4 text-12"
        >
          <CheckBox isChecked={isChecked} />
          사용 불가능한 쿠폰 포함
        </button>
      </div>
      <div className="flex flex-col gap-16">
        {!MOCK_COUPONS.length ? (
          <NoCoupon />
        ) : (
          MOCK_COUPONS.map((coupon) => (
            <Coupon key={coupon.title} {...coupon} />
          ))
        )}
      </div>
    </section>
  );
};

export default CouponList;

const NoCoupon = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-28 ">
      <CouponIcon />
      <span className="text-16 font-400 text-grey-300">쿠폰이 없어요</span>
      <Link
        href="/"
        className="text-14 font-500 text-grey-600-sub underline underline-offset-[3px]"
      >
        진행 중인 이벤트는 홈 화면 배너를 확인하세요
      </Link>
    </div>
  );
};
