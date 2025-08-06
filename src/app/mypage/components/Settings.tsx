'use client';

import ListButton from './ListButton';

const Settings = () => {
  return (
    <div className="flex flex-col gap-[18px] px-16 pb-32">
      <section>
        <h3 className="pb-8 text-14 font-600 text-basic-grey-500">서비스</h3>
        <ListButton href="/mypage/alert-requests">빈자리 알림</ListButton>
        <ListButton href="/mypage/coupons">쿠폰</ListButton>
      </section>
      <section>
        <h3 className="pb-8 text-14 font-600 text-basic-grey-500">
          핸디버스 완벽 정복
        </h3>
        <ListButton href="/help/handybus-guide">핸디버스 가이드</ListButton>
        <ListButton href="/help/about">서비스 소개</ListButton>
      </section>
      <div className="-mx-16 h-[8px] bg-basic-grey-50" />
      <section>
        <ListButton href="/help/faq" hideArrow>
          도움말
        </ListButton>
        <ListButton href="/announcements" hideArrow>
          공지사항
        </ListButton>
        <ListButton href="/mypage/settings" hideArrow>
          환경설정
        </ListButton>
      </section>
    </div>
  );
};

export default Settings;
