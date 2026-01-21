import { Metadata } from 'next';
import { URL } from '@/constants/metadata';
import CatchGrapeGame from './components/CatchGrapeGame';

export const metadata: Metadata = {
  title: '핸디버스 | 포도알 트레이닝',
  description: '이번 티켓팅, 포도알 트레이닝으로 맹연습해서 같이 성공할까요?',
  openGraph: {
    title: '핸디버스 | 포도알 트레이닝',
    description: '이번 티켓팅, 포도알 트레이닝으로 맹연습해서 같이 성공할까요?',
    images: [
      {
        url: `${URL}/images/catch-grape-thumbnail.png`,
        width: 1200,
        height: 630,
        alt: '포도알 트레이닝',
      },
    ],
  },
};

const CatchGrapePage = () => {
  return <CatchGrapeGame />;
};

export default CatchGrapePage;
