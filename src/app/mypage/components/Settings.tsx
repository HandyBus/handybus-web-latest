'use client';

import ListButton from './ListButton';
import logout from '@/app/actions/logout.action';

interface Props {
  couponCount: number;
  reviewCount: number;
}

const Settings = ({ couponCount, reviewCount }: Props) => {
  return (
    <section>
      <ListButton
        title="쿠폰함"
        href="/mypage/coupons"
        description={`${couponCount}장`}
      />
      <ListButton
        title="작성한 후기 조회"
        href="/mypage/reviews"
        description={`${reviewCount}건`}
      />
      <ListButton title="로그아웃" hideArrow onClick={() => logout()} />
      <ListButton title="회원 탈퇴" href="/mypage/leave" />
    </section>
  );
};

export default Settings;
