'use client';

import { ReactNode, useState } from 'react';
import Section from '../components/Section';
import Button from '@/components/buttons/button/Button';
import NoticeSection from '@/components/notice-section/NoticeSection';
import AppBar from '@/components/app-bar/AppBar';
import Link from 'next/link';
import Divider from '../components/Divider';
import RefundPolicy from '../components/RefundPolicy';
import { SECTION } from '@/types/shuttle.types';
import ShuttleRouteVisualizer from '@/components/shuttle/shuttle-route-visualizer/ShuttleRouteVisualizer';
import ReservationCard from '../components/ReservationCard';
import { ReservationType } from '@/types/client.types';
import HandyRequestModal from '@/components/modals/handy-request/HandyRequestModal';

interface Props {
  params: {
    id: string;
  };
}

const ShuttleDetail = ({ params }: Props) => {
  const { id } = params;
  const [isHandyRequestModalOpen, setIsHandyRequestModalOpen] = useState(false);
  const handleHandyRequestConfirm = () => {
    setIsHandyRequestModalOpen(false);
  };
  const handleHandyRequestClosed = () => {
    setIsHandyRequestModalOpen(false);
  };
  return (
    <>
      <AppBar>예약 상세 보기</AppBar>
      <main className="grow">
        <ReservationCard reservation={MOCK_RESERVATION_DATA} />
        <section className="m-16 rounded-[10px] bg-primary-50 p-16 text-14 font-400 text-grey-800">
          현재 셔틀 정보, 기사님 정보, 핸디 정보 등을 결정하고 있어요. 확정되면
          알림톡을 전송해드릴게요.
        </section>
        <Section title="당신은 핸디입니다">
          <p className="pt-4 text-12 font-400 text-grey-500">
            ___(닉네임) 님은 이번 셔틀의 핸디로 선정되셨습니다.
          </p>
          <Link
            href={'/'}
            className="ml-auto mt-8 block w-fit rounded-full bg-grey-100 px-16 text-14 font-400 text-grey-600-sub"
          >
            핸디 가이드 보러가기
          </Link>
        </Section>
        <Section title="셔틀 정보">
          <div className="flex flex-col gap-8">
            <DetailRow title="차량 종류" content="28인승 우등버스" />
            <DetailRow title="배정 호차" content="2호차" />
            <DetailRow title="차량 번호" content="충북76바 3029" />
            <DetailRow
              title="오픈채팅방 링크"
              content="https://openchat.example.com"
            />
            <DetailRow title="핸디 정보" content="나핸디할래요" />
            <DetailRow title="전화번호" content="010-1234-5678" />
          </div>
        </Section>
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
            <Passenger
              index={1}
              name="홍길동"
              phoneNumber="010-1234-5678"
              tagText="핸디 지원"
            />
            <Passenger index={2} name="홍길동" phoneNumber="010-1234-5678" />
            <div className="flex flex-col gap-8">
              <button
                onClick={() => setIsHandyRequestModalOpen(true)}
                className="ml-auto block w-fit rounded-full bg-grey-100 px-16 text-14 font-400 text-grey-600-sub"
              >
                핸디 지원/취소하기
              </button>
              <p className="text-right text-12 font-400 text-grey-500">
                핸디는 탑승객1(직접 신청자)만 지원이 가능합니다.{' '}
                <Link
                  href="/help/what-is-handy"
                  className="text-right text-12 font-400 text-grey-500 underline"
                >
                  핸디 더 알아보기
                </Link>
              </p>
            </div>
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
      <HandyRequestModal
        isOpen={isHandyRequestModalOpen}
        onConfirm={handleHandyRequestConfirm}
        onClosed={handleHandyRequestClosed}
        buttonText="지원/취소하기"
      />
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
  tagText?: string;
}

const Passenger = ({ index, name, phoneNumber, tagText }: PassengerProps) => {
  return (
    <section className="flex flex-col gap-8">
      <h4 className="flex items-center gap-8 pb-4 text-18 font-500 text-grey-700">
        탑승객 {index}
        {tagText && (
          <div className="rounded-full border border-grey-100 px-8 text-12 font-400 text-grey-600-sub">
            {tagText}
          </div>
        )}
      </h4>
      <DetailRow title="이름" content={name} />
      <DetailRow title="전화번호" content={phoneNumber} />
    </section>
  );
};

const MOCK_RESERVATION_DATA: ReservationType = {
  id: 0,
  shuttle: {
    id: 0,
    name: 'string',
    date: 'string',
    image:
      'https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/19/c5cd0937-06c6-4f4c-9f22-660c5ec8adfb.jpg',
    status: 'OPEN',
    destination: {
      name: 'string',
      longitude: 0,
      latitude: 0,
    },
    route: {
      name: 'string',
      status: 'OPEN',
      hubs: {
        pickup: [
          {
            name: 'string',
            sequence: 0,
            arrivalTime: 'string',
            selected: true,
          },
        ],
        dropoff: [
          {
            name: 'string',
            sequence: 0,
            arrivalTime: 'string',
            selected: true,
          },
        ],
      },
    },
  },
  hasReview: true,
  review: {
    id: 0,
    rating: 0,
    content: 'string',
    images: [
      {
        imageUrl: 'https://example.com/image.jpg',
        status: 'ACTIVE',
        createdAt: 'string',
        updatedAt: 'string',
      },
    ],
    createdAt: 'string',
  },
  type: 'TO_DESTINATION',
  reservationStatus: 'NOT_PAYMENT',
  cancelStatus: 'NONE',
  handyStatus: 'NOT_SUPPORTED',
  passengers: [
    {
      name: 'string',
      phoneNumber: 'string',
    },
  ],
  payment: {
    id: 0,
    principalAmount: 0,
    paymentAmount: 0,
    discountAmount: 0,
  },
  shuttleBus: {
    shuttleBusID: 1,
    shuttleRouteID: 100,
    handyUserID: 100,
    type: 'SEATER_12',
    name: '스타렉스',
    number: '12가 3456',
    phoneNumber: '010-1234-5678',
    openChatLink: 'https://openchat.example.com',
    capacity: 12,
  },
  createdAt: 'string',
};
