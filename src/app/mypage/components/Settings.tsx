'use client';

import { handleLogout } from '@/utils/handleSession';
import ListButton from './ListButton';

const Settings = () => {
  return (
    <section>
      <ListButton title="쿠폰함" href="/mypage/coupons" description="0장" />
      <ListButton
        title="작성한 후기 조회"
        href="/mypage/reviews"
        description="0건"
      />
      <ListButton title="로그아웃" href="/" hideArrow onClick={handleLogout} />
      <ListButton title="회원 탈퇴" href="/mypage/leave" />
    </section>
  );
};

export default Settings;
