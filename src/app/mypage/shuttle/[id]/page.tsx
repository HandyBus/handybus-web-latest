import ShuttleCard, { MOCK_SHUTTLE_DATA } from '../components/ShuttleCard';
import { ReactNode } from 'react';
import Section from '../components/Section';
import Button from '@/components/buttons/button/Button';
import NoticeSection from '@/components/notice-section/NoticeSection';
import ShuttleRouteVisualizer from '@/components/shuttle/shuttle-route-visualizer/ShuttleRouteVisualizer';
import AppBar from '@/components/app-bar/AppBar';
import Link from 'next/link';
import Divider from '../components/Divider';
import RefundPolicy from '../components/RefundPolicy';
import { SECTION } from '@/types/shuttle.types';

interface Props {
  params: {
    id: string;
  };
}

const ShuttleDetail = ({ params }: Props) => {
  const { id } = params;
  console.log(id);
  return (
    <>
      <AppBar>예약 상세 보기</AppBar>
      <main className="grow">
        <ShuttleCard id={1} data={MOCK_SHUTTLE_DATA} />
        <Section title="당신은 핸디입니다~">TODO</Section>
        <Section title="예약 정보">
          <div className="flex flex-col gap-28">
            <section className="flex flex-col gap-8">
              <DetailRow title="탑승일" content="2024. 09. 01. (토)" />
              <DetailRow title="노선 종류" content="청주-천안" />
              <DetailRow title="왕복 여부" content="2024. 09. 01. (토)" />
              <DetailRow
                title={
                  <>
                    탑승 장소
                    <br />
                    <span className="text-14">(콘서트행)</span>
                  </>
                }
                content="청주터미널"
              />
              <DetailRow
                title={
                  <>
                    하차 장소
                    <br />
                    <span className="text-14">(귀가행)</span>
                  </>
                }
                content="청주대학교"
              />
              <DetailRow title="탑승객 수" content="2명" />
            </section>
            <Passenger index={1} name="홍길동" phoneNumber="010-1234-5678" />
            <Passenger index={2} name="홍길동" phoneNumber="010-1234-5678" />
          </div>
        </Section>
        <Divider />
        <ShuttleRouteVisualizer
          object={[
            { time: '2024-03-20 14:30:00', location: '청주터미널' },
            { time: '2024-03-20 14:40:00', location: '청주대학교' },
            { time: '2024-03-20 14:50:00', location: '장소3' },
            { time: '2024-03-20 15:00:00', location: '장소4' },
            { time: '2024-03-20 15:10:00', location: '장소5' },
            { time: '2024-03-20 15:20:00', location: '장소6' },
          ]}
          section={SECTION.MY_RESERVATION}
        />
        <Section title="결제 정보">
          <div className="flex w-full gap-4 pb-8">
            <div>예약 금액</div>
            <div className="grow text-right">
              <span className="block leading-[24px]">104,000원</span>
              <span className="block text-12 leading-[160%]">
                (52,000원 * 2인)
              </span>
            </div>
          </div>
          <div className="flex w-full gap-4 pb-24">
            <div>할인 금액</div>
            <div className="grow text-right font-500">0원</div>
          </div>
          <div className="flex w-full gap-4">
            <div className="text-18 font-500">최종 결제 금액</div>
            <div className="grow text-right text-22 font-600">104,000원</div>
          </div>
        </Section>
        <Section title="취소 및 환불 안내">
          <RefundPolicy />
          <Link href={`/mypage/shuttle/${id}/refund`}>
            <Button variant="secondary">환불 신청하기</Button>
          </Link>
        </Section>
        <Divider />
        <NoticeSection type="term-and-condition" />
      </main>
    </>
  );
};

export default ShuttleDetail;

interface DetailRowProps {
  title: ReactNode;
  content: string;
}

const DetailRow = ({ title, content }: DetailRowProps) => {
  return (
    <div className="grid grid-cols-[80px_1fr] gap-32 text-16 font-400">
      <h5 className="text-grey-600-sub">{title}</h5>
      <div className="text-grey-900">{content}</div>
    </div>
  );
};

interface PassengerProps {
  index: number;
  name: string;
  phoneNumber: string;
}

const Passenger = ({ index, name, phoneNumber }: PassengerProps) => {
  return (
    <section className="flex flex-col gap-8">
      <h4 className="pb-4 text-18 font-500 text-grey-700">탑승객 {index}</h4>
      <DetailRow title="이름" content={name} />
      <DetailRow title="전화번호" content={phoneNumber} />
    </section>
  );
};
