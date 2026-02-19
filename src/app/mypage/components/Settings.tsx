'use client';

import ListButton from './ListButton';

const Settings = () => {
  return (
    <div className="flex flex-col gap-[18px]">
      <section className="px-16">
        <ListButton href="/mypage/coupons">쿠폰</ListButton>
        <ListButton href="/mypage/reviews">내 후기</ListButton>
        <ListButton href="/game/catch-grape" isNew>
          포도알 트레이닝
        </ListButton>
        <ListButton href="/announcements">공지사항</ListButton>
        <ListButton href="/help/handybus-guide">이용방법</ListButton>
      </section>
      <div className="h-[8px] bg-basic-grey-50" />
      <section className="px-16">
        <ListButton href="/help/faq">도움말</ListButton>
        <ListButton href="/help/about">서비스 소개</ListButton>
        <ListButton href="/mypage/settings">환경설정</ListButton>
      </section>
    </div>
  );
};

export default Settings;
