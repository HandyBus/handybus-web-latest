import Button from '@/components/buttons/button/Button';
import { Metadata } from 'next';
import Image, { StaticImageData } from 'next/image';
import guideImage from './images/handybus-guide.png';
import guideImageStep1 from './images/handybus-guide-step-1.png';
import guideImageStep2 from './images/handybus-guide-step-2.png';
import guideImageStep3 from './images/handybus-guide-step-3.png';
import guideImageStep4 from './images/handybus-guide-step-4.png';
import guideImageStep5 from './images/handybus-guide-step-5.png';
import guideImageStep6 from './images/handybus-guide-step-6.png';
import Link from 'next/link';
import ChevronRightEmIcon from 'public/icons/chevron-right-em.svg';
import Header from '@/components/header/Header';

export const metadata: Metadata = {
  title: '핸디버스 가이드',
  description:
    '핸디버스 수요조사 참여 그리고 셔틀 예약부터 탑승까지의 상세 가이드를 제공합니다.',
};

const HandybusGuide = () => {
  return (
    <main>
      <Header />
      <figure>
        <Image src={guideImage} alt="핸디버스 가이드" quality={100} />
      </figure>
      <article className="mx-16 mb-16 flex flex-col gap-64">
        <section className="mt-16 flex flex-col gap-8">
          <h1 className="text-22 font-700 leading-[140%]">핸디버스 가이드</h1>
          <p className="text-16 font-500 leading-[160%] text-basic-grey-700">
            핸디버스에 오신 걸 환영해요! 여러분의 원활한 셔틀 여정을 위해 셔틀
            예약 과정을 알려드릴게요.
          </p>
        </section>
        {HANDYBUS_GUIDE_STEPS.map((item) => (
          <GuideItem key={item.order} {...item} />
        ))}
        <nav className="flex flex-col gap-16">
          <h2 className="text-18 font-600 leading-[140%]">
            핸디버스 탈 준비 되셨나요?
          </h2>
          <Link href="/event">
            <Button variant="secondary">행사 둘러보기</Button>
          </Link>
          <Link href="/help/faq">
            <Button variant="tertiary">자주 묻는 질문</Button>
          </Link>
        </nav>
      </article>
    </main>
  );
};

export default HandybusGuide;

interface GuideItemProps {
  order: number;
  title: string;
  description: string;
  image: StaticImageData;
  tagDescription?: string;
  redirectUrl?: string;
}

const GuideItem = ({
  order,
  title,
  description,
  image,
  tagDescription,
  redirectUrl,
}: GuideItemProps) => {
  return (
    <section className="flex flex-col gap-16">
      <div className="flex gap-8">
        <div className="h-[25px] w-28 rounded-6 bg-basic-grey-100 text-center text-18 font-600 leading-[140%] text-basic-grey-700">
          {order}
        </div>
        <h2 className="text-18 font-600 leading-[140%]">{title}</h2>
        {tagDescription && <Tag>{tagDescription}</Tag>}
      </div>
      <figure>
        <Image src={image} alt={title} quality={100} />
      </figure>
      <p className="text-16 font-400 leading-[160%] text-basic-grey-700">
        {description}
      </p>
      {redirectUrl && (
        <Link href={redirectUrl} target="_blank">
          <Button
            variant="text"
            className="flex items-center gap-[10px] text-16 font-600 leading-[140%]"
          >
            공식 X 계정 바로가기
            <ChevronRightEmIcon className="h-16 w-16 stroke-2 text-basic-grey-700" />
          </Button>
        </Link>
      )}
    </section>
  );
};

const Tag = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-[42px] border border-basic-grey-200 px-8 py-4 text-center text-10 font-600 leading-[160%] text-basic-grey-700">
      {children}
    </div>
  );
};

const HANDYBUS_GUIDE_STEPS = [
  {
    order: 1,
    title: '수요조사 참여',
    description:
      '행사 별 셔틀이 열리도록 수요조사에 참여하세요. 원하는 지역과 정류장을 선택하고, ‘요청하기’를 누르면 참여가 완료돼요. 수요조사는 행사 15일 전에 마감되며, 기준 인원을 넘은 지역에 노선이 개설돼요.',
    image: guideImageStep1,
    tagDescription: '탑승 15일 전 마감',
  },
  {
    order: 2,
    title: '셔틀 오픈 알림',
    description:
      '요청한 지역에 셔틀이 열리면 카카오톡으로 알림을 보내드려요. 핸디버스 공식 X 계정 (@Handy_Bus)에도 공지되니 확인해 주세요. 예약을 받는 셔틀은 무산 없이 100% 운행돼요. 인기 정류장은 빠르게 매진되니 서둘러 예약하세요!',
    image: guideImageStep2,
    redirectUrl: 'https://x.com/Handy_Bus',
  },
  {
    order: 3,
    title: '예약하기',
    description:
      '노선 정보를 확인한 후 예약을 진행하세요. 간편 결제로 더욱 손쉽게 결제가 가능해요. 이미 마감된 노선이라면, ‘추가 셔틀 요청하기’ 기능을 이용할 수 있어요.',
    image: guideImageStep3,
    tagDescription: '탑승 4일 전 마감',
  },
  {
    order: 4,
    title: '오픈채팅방 참여',
    description:
      '모든 배차 정보와 인원이 확정되면, 핸디가 오픈채팅방을 개설해요. 채팅방 개설 알림톡으로 받은 링크를 통해 입장해 주세요. 오픈채팅방에서 자유롭게 이야기 나누세요!',
    image: guideImageStep4,
    tagDescription: '탑승 4일 전 초대',
  },
  {
    order: 5,
    title: '최종 공지',
    description:
      '오픈채팅방을 통해 최종 탑승 안내를 드려요. 정류장 위치와 시간 등 꼭 확인해 주세요.',
    image: guideImageStep5,
    tagDescription: '탑승 2일 전 공지',
  },
  {
    order: 6,
    title: '탑승',
    description:
      '예약하신 시간과 정류장에 맞춰 셔틀버스에 탑승하세요! 당일 교통 상황 등으로 인한 실시간 변동 사항은 오픈 채팅방을 통해 공지드릴게요.',
    image: guideImageStep6,
    tagDescription: '탑승 당일',
  },
];
