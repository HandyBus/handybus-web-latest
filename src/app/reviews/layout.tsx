import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '후기 전체보기',
  description: '생생한 핸디버스의 후기를 확인하세요!',
  robots: {
    index: false,
    follow: false,
  },
};

const ReviewsLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ReviewsLayout;
