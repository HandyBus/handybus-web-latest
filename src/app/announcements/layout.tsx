import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '공지사항 전체보기',
  description: '핸디버스의 공지사항 목록을 확인하세요!',
};

const AnnouncementsLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default AnnouncementsLayout;
