'use client';

import ListButton from './ListButton';
import { logout } from '@/utils/handleToken.util';

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
        title="의견 남기기"
        href="https://docs.google.com/forms/d/1_PgL6I3XDhbAEae_CBMnwzaJXlTJdHswhUtriJ58fi8/edit" // TODO: 핸디버스 계정의 링크로 수정 필요
        newTab={true}
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
