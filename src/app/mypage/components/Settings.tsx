'use client';

import ListButton from './ListButton';

const Settings = () => {
  return (
    <div className="flex flex-col gap-[18px] px-16">
      <section>
        <h3 className="pb-8 text-14 font-600 text-basic-grey-500">서비스</h3>
        <ListButton content="빈자리 알림" href="/mypage/coupons" />
      </section>
      <section>
        <h3 className="pb-8 text-14 font-600 text-basic-grey-500">
          핸디버스 완벽 정복
        </h3>
        <ListButton content="핸디버스 가이드" href="/mypage/coupons" />
        <ListButton content="핸디 알아보기" href="/mypage/coupons" />
        <ListButton content="서비스 소개" href="/mypage/coupons" />
      </section>
      <div className="-mx-16 h-[8px] bg-basic-grey-50" />
      <section>
        <ListButton content="도움말" href="/mypage/coupons" hideArrow />
        <ListButton content="공지사항" href="/mypage/coupons" hideArrow />
        <ListButton content="환경설정" href="/mypage/coupons" hideArrow />
      </section>
    </div>
  );
};

export default Settings;
