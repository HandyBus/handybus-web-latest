import { Metadata } from 'next';
import Image from 'next/image';
import OverviewImage1 from './images/service-overview-1.png';
import OverviewImage2 from './images/service-overview-2.png';
import Link from 'next/link';
import RequestEventButton from './components/RequestEventButton';

export const metadata: Metadata = {
  title: '소개',
};

const AboutPage = () => {
  return (
    <main>
      <Image src={OverviewImage1} alt="overview" />
      <div className="flex flex-col items-center gap-8 pb-32">
        <Link
          href="/event"
          className="h-[50px] w-[calc(100%-64px)] rounded-[8px] bg-brand-primary-400 px-16 py-12 text-center text-16 font-600 leading-[160%] text-basic-white"
        >
          셔틀 수요조사 참여하기
        </Link>
        <RequestEventButton>행사 요청하기</RequestEventButton>
      </div>
      <Image src={OverviewImage2} alt="overview" />
      <div className="flex flex-col items-center gap-16 bg-basic-black pb-48 pt-32">
        <p className="text-20 font-600 leading-[140%] text-basic-white">
          설레는 여정을 함께 떠나볼까요?
        </p>
        <Link
          href="/event"
          className="h-[50px] w-[calc(100%-64px)] rounded-[8px] bg-brand-primary-400 px-16 py-12 text-center text-16 font-600 leading-[160%] text-basic-white"
        >
          행사 둘러보기
        </Link>
      </div>
    </main>
  );
};

export default AboutPage;
