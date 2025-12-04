'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperRef } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { ReservationsViewEntity } from '@/types/reservation.type';
import useTicketData from '../hooks/useTicketData';
import ArrowIcon from '../icons/white-arrow-right.svg';
import InfoIcon from '/public/icons/info.svg';
import PinIcon from '../icons/pin-primary.svg';
import DotPrimaryIcon from '../icons/dot-primary.svg';
import { KAKAO_CHANNEL_URL } from '@/constants/common';
import { handleExternalLink } from '@/utils/externalLink.util';
import { dateString } from '@/utils/dateString.util';

interface Props {
  reservation: ReservationsViewEntity;
}

const TicketSwiperView = ({ reservation }: Props) => {
  const swiper = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const {
    selectedHubNameToDestination,
    selectedHubNameFromDestination,
    arrivalHubNameToDestination,
    departureHubNameFromDestination,
    boardingTimeToDestination,
    arrivalTimeToDestination,
    boardingTimeFromDestination,
    arrivalTimeFromDestination,
    durationToDestination,
    durationFromDestination,
    passengerCount,
    userName,
    userPhoneNumber,
  } = useTicketData(reservation);

  const tickets = [
    {
      type: '행사장행',
      departureHub: selectedHubNameToDestination,
      arrivalHub: arrivalHubNameToDestination,
      boardingTime: boardingTimeToDestination,
      arrivalTime: arrivalTimeToDestination,
      duration: durationToDestination,
    },
    {
      type: '귀가행',
      departureHub: departureHubNameFromDestination,
      arrivalHub: selectedHubNameFromDestination,
      boardingTime: boardingTimeFromDestination,
      arrivalTime: arrivalTimeFromDestination,
      duration: durationFromDestination,
    },
  ];

  return (
    <div className="relative">
      {/* 스와이프 가능한 전체 탑승권 영역 (헤더 포함) */}
      <Swiper
        ref={swiper}
        modules={[Pagination]}
        slidesPerView={1.125}
        spaceBetween={12}
        centeredSlides={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {tickets.map((ticket, index) => (
          <SwiperSlide key={index}>
            <div
              className={`rounded-[8px] bg-basic-white transition-all duration-300 ${
                index !== activeIndex ? 'opacity-60' : 'opacity-100'
              }`}
            >
              {/* 헤더 - 왕복 정보와 페이지네이션 */}
              <section className="flex items-center justify-between rounded-t-[8px] bg-brand-primary-400 px-16 py-12">
                <h1 className="text-16 font-600 leading-[140%] text-basic-white">
                  왕복 | {ticket.type}
                </h1>
                <div className="flex items-center gap-8 text-18 font-500 leading-[160%] text-basic-white">
                  <button
                    onClick={() => swiper.current?.swiper.slideTo(0)}
                    disabled={activeIndex === 0}
                  >
                    <ArrowIcon
                      className={`rotate-180 ${activeIndex === 0 ? 'opacity-50' : ''}`}
                    />
                  </button>
                  {activeIndex + 1}/2
                  <button
                    onClick={() => swiper.current?.swiper.slideTo(1)}
                    disabled={activeIndex === 1}
                  >
                    <ArrowIcon
                      className={`${activeIndex === 1 ? 'opacity-50' : ''}`}
                    />
                  </button>
                </div>
              </section>

              {/* 탑승지/하차지 */}
              <section className="flex flex-col gap-8 px-16 py-16">
                <h2 className="text-14 font-600 leading-[140%] text-basic-grey-600">
                  {reservation.shuttleRoute.event.eventName}
                </h2>
                <div className="flex gap-8">
                  <div>
                    <SimpleRouteLine />
                  </div>
                  <div className="flex flex-col gap-24">
                    <div className="flex gap-[6px]">
                      <Tag type="departure" />
                      <p className="text-22 font-600 leading-[140%]">
                        {ticket.departureHub}
                      </p>
                    </div>
                    <div className="flex gap-[6px]">
                      <Tag type="arrival" />
                      <p className="text-22 font-600 leading-[140%]">
                        {ticket.arrivalHub}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="border-t border-basic-grey-100" />

              {/* 탑승일시 */}
              <section className="flex flex-col gap-8 px-16 pb-24 pt-16">
                <h2 className="text-14 font-600 leading-[140%] text-basic-grey-400">
                  탑승일시
                </h2>
                <p className="text-20 font-600 leading-[140%]">
                  {dateString(ticket.boardingTime, {
                    showShortYear: true,
                    showDate: true,
                    showTime: true,
                    showWeekday: true,
                  })}
                  <span className="text-14 font-500 leading-[160%] text-basic-grey-400">
                    ~
                    {dateString(ticket.arrivalTime, {
                      showYear: false,
                      showDate: false,
                      showWeekday: false,
                      showTime: true,
                    })}
                  </span>
                </p>
              </section>

              {/* 노선도 구분선 */}
              <div className="relative">
                <div className="absolute -left-[10px] top-1/2 h-[20px] w-[20px] -translate-y-1/2 rounded-full bg-basic-black"></div>
                <div className="absolute -right-[10px] top-1/2 h-[20px] w-[20px] -translate-y-1/2 rounded-full bg-basic-black"></div>
                <div className="mx-10 border-[1px] border-dashed border-basic-grey-300"></div>
              </div>

              {/* 탑승인원, 예상소요시간 및 좌석 */}
              <section className="grid grid-cols-3 gap-16 px-16 pb-16 pt-24">
                <div className="col-span-3 flex flex-col gap-8">
                  <h2 className="text-14 font-600 leading-[140%] text-basic-grey-400">
                    탑승자 정보
                  </h2>
                  <div className="text-18 font-600 leading-[160%]">
                    <span>{userName + ' (' + userPhoneNumber + ')'}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-8">
                  <h2 className="text-14 font-600 leading-[140%] text-basic-grey-400">
                    예상 소요시간
                  </h2>
                  <p className="text-18 font-600 leading-[160%]">
                    {ticket.duration}
                  </p>
                </div>
                <div className="flex flex-col gap-8">
                  <h2 className="text-14 font-600 leading-[140%] text-basic-grey-400">
                    탑승인원
                  </h2>
                  <p className="text-18 font-600 leading-[160%]">
                    {passengerCount}명
                  </p>
                </div>
                <div className="flex flex-col gap-8">
                  <h2 className="text-14 font-600 leading-[140%] text-basic-grey-400">
                    좌석
                  </h2>
                  <p className="text-18 font-600 leading-[160%]">자율석</p>
                </div>
              </section>

              {/* 핸디버스 채널 문의하기 */}
              <button
                className="flex w-full items-center gap-4 rounded-b-[8px] bg-basic-grey-50 px-16 py-12"
                type="button"
                onClick={() => handleExternalLink(KAKAO_CHANNEL_URL)}
              >
                <InfoIcon />
                <h2 className="text-14 font-600 leading-[140%] text-basic-grey-600">
                  핸디버스 채널 문의하기
                </h2>
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TicketSwiperView;

const Tag = ({ type }: { type: 'departure' | 'arrival' }) => {
  const tagText = type === 'departure' ? '출발' : '도착';

  return (
    <div className="mt-4 h-fit w-fit whitespace-nowrap rounded-[10px] border border-basic-grey-200 px-8 py-4 text-10 font-600 leading-[160%] text-basic-grey-700">
      {tagText}
    </div>
  );
};

const SimpleRouteLine = () => {
  return (
    <section className="flex h-full flex-col items-center justify-between pb-[14px] pt-[10px]">
      <div className="relative z-10 h-[11px]">
        <DotPrimaryIcon />
      </div>
      <div className="my-[-2px] h-full w-[2px] bg-brand-primary-400" />
      <div className="relative z-10 h-[11px]">
        <PinIcon />
      </div>
    </section>
  );
};
