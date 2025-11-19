'use client';

import { useFlow } from '@/stacks';
import ListButton from './ListButton';

const Settings = () => {
  const flow = useFlow();
  return (
    <div className="flex flex-col gap-[18px]">
      <section className="px-16">
        <ListButton onClick={() => flow.push('Coupons', {})}>쿠폰</ListButton>
        <ListButton onClick={() => flow.push('Reviews', {})}>
          내 후기
        </ListButton>
        <ListButton onClick={() => flow.push('AnnouncementList', {})}>
          공지사항
        </ListButton>
        <ListButton
          onClick={() => flow.push('HandybusGuide', { tab: 'SHUTTLE_BUS' })}
        >
          이용방법
        </ListButton>
      </section>
      <div className="h-[8px] bg-basic-grey-50" />
      <section className="px-16">
        <ListButton onClick={() => flow.push('Faq', {})}>도움말</ListButton>
        <ListButton onClick={() => flow.push('About', {})}>
          서비스 소개
        </ListButton>
        <ListButton onClick={() => flow.push('Settings', {})}>
          환경설정
        </ListButton>
      </section>
    </div>
  );
};

export default Settings;
