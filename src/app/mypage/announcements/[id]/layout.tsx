import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '공지사항',
  description: '핸디버스의 공지사항을 확인하세요!',
};

const AnnouncementLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default AnnouncementLayout;
