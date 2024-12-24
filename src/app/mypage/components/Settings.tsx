'use client';

import { revalidatePaths } from '@/utils/revalidatePath';
import ListButton from './ListButton';

interface Props {
  couponCount: number;
  reviewCount: number;
}

const Settings = ({ couponCount, reviewCount }: Props) => {
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        redirect: 'follow',
      });
      revalidatePaths();
      if (response.redirected) {
        window.location.href = response.url;
      }
    } catch (error) {
      console.error('로그아웃 실패: ', error);
    }
  };

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
      <ListButton title="로그아웃" hideArrow onClick={handleLogout} />
      <ListButton title="회원 탈퇴" href="/mypage/leave" />
    </section>
  );
};

export default Settings;
