import AppBar from '@/components/app-bar/AppBar';
import ShuttleCard from '../components/ShuttleCard';
import { ReactNode } from 'react';
import Section from '../components/Section';
import Footer from '@/components/footer/Footer';

interface Props {
  params: {
    id: string;
  };
}

const ShuttleDetail = ({ params }: Props) => {
  console.log(params);
  return (
    <>
      <AppBar>예약 상세 보기</AppBar>
      <main className="grow">
        <ShuttleCard />
        <Section title="당신은 핸디입니다~">TODO</Section>
        <Section title="셔틀 예약 내역">
          <div className="flex flex-col gap-28 pt-24">
            <div className="flex flex-col gap-8">
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
            </div>
            <Passenger index={1} name="홍길동" phoneNumber="010-1234-5678" />
            <Passenger index={2} name="홍길동" phoneNumber="010-1234-5678" />
          </div>
        </Section>
        <Section title="예상 노선 정보">TODO</Section>
        <Section title="결제 정보">
          <div className="flex w-full gap-4 pb-8 pt-32">
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
        <Section title="환불 정보">
          <ul className="list-disc pl-16 pt-4 text-14 leading-[160%] text-grey-500">
            <li>
              예약한 셔틀의 출발일 기준 8일 이전 환불 신청 건은 자동으로 전액
              환불되지만, 이후에는 환불 규정에 따라 수수료가 발생할 수 있습니다.
            </li>
            <li>
              결제 당일 취소 시, 23:59까지 무료 취소 가능합니다(당일 탑승 건
              제외, 개별 채널톡 문의)
            </li>
          </ul>
        </Section>
        <Section title="기타 유의사항">TODO</Section>
      </main>
      <Footer />
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
    <div className="grid grid-cols-[80px_1fr] gap-32">
      <h5 className="text-grey-600-sub">{title}</h5>
      <div>{content}</div>
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
    <div className="flex flex-col gap-8">
      <h4 className="pb-4 text-18 font-500 text-grey-700">탑승객 {index}</h4>
      <DetailRow title="이름" content={name} />
      <DetailRow title="전화번호" content={phoneNumber} />
    </div>
  );
};
