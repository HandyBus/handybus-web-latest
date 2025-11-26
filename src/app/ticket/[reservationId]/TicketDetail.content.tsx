'use client';

import { useGetUserReservation } from '@/services/reservation.service';
import InfoIcon from '/public/icons/info.svg';
import { KAKAO_CHANNEL_URL } from '@/constants/common';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import useTicketData from './hooks/useTicketData';
import TicketSkeleton from './components/TicketSkeleton';
import TicketSwiperView from './components/TicketSwiperView';
import PinIcon from './icons/pin-primary.svg';
import DotPrimaryIcon from './icons/dot-primary.svg';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { useSearchParams } from 'next/navigation';
import { handleExternalLink } from '@/utils/externalLink.util';
import Header from '@/components/header/Header';

interface Props {
  reservationId: string;
}

const TicketDetail = ({ reservationId }: Props) => {
  const searchParams = useSearchParams();
  const direction = searchParams.get('direction') || undefined;
  const { data, isLoading: isReservationLoading } =
    useGetUserReservation(reservationId);
  const reservation = data?.reservation;
  const isShuttleEnded = reservation?.shuttleRoute.status === 'ENDED';
  const isCanceled = reservation?.reservationStatus === 'CANCEL';

  const isLoading = isReservationLoading;

  useEffect(() => {
    if (!isLoading && !reservation) {
      window.location.href = '/history?type=reservation';
      return;
    }
  }, [isLoading, reservationId, reservation]);

  if (isLoading) {
    return <TicketSkeleton />;
  }
  if (isShuttleEnded || isCanceled) {
    window.location.href = '/history?type=reservation';
  }
  if (!reservation) {
    return null;
  }
  return <Ticket reservation={reservation} direction={direction} />;
};

interface TicketProps {
  reservation: ReservationsViewEntity;
  direction?: string;
}

const Ticket = ({ reservation, direction }: TicketProps) => {
  const [currentTripType, setCurrentTripType] = useState<
    '행사장행' | '귀가행'
  >();
  useEffect(() => {
    setCurrentTripType(
      reservation?.type === 'ROUND_TRIP'
        ? direction === 'TO_DESTINATION'
          ? '행사장행'
          : direction === 'FROM_DESTINATION'
            ? '귀가행'
            : '행사장행'
        : reservation?.type === 'TO_DESTINATION'
          ? '행사장행'
          : reservation?.type === 'FROM_DESTINATION'
            ? '귀가행'
            : undefined,
    );
  }, [reservation, direction]);

  const {
    isRoundTrip,
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

  return (
    <>
      <Header pageName="탑승권" />
      {/* 피시와 모바일 환경 모두에서 화면 높이를 설정 */}
      <main className="min-h-[100dvh] bg-basic-black">
        <aside className="bg-basic-red-100 px-16 py-8 text-center text-14 font-600 leading-[160%] text-basic-red-400">
          캡쳐화면은 탑승이 제한될 수 있습니다.
        </aside>

        <article className="flex flex-col gap-16">
          <AntiCapture />

          <div className="flex flex-col gap-24">
            {/* 왕복일 때는 스와이프 뷰 사용, 편도일 때는 기존 뷰 사용 */}
            {isRoundTrip ? (
              <TicketSwiperView reservation={reservation} />
            ) : (
              <div className="px-[22px]">
                <div className="rounded-[8px] bg-basic-white">
                  {/* 여정타입 */}
                  <section className="flex items-center justify-between rounded-t-[8px] bg-brand-primary-400 px-16 py-12 ">
                    <h1 className="text-16 font-600 leading-[140%] text-basic-white">
                      {currentTripType}
                    </h1>
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
                          {/* 태그 */}
                          <Tag type="departure" />
                          {/* 탑승지 */}
                          <p className="text-22 font-600 leading-[140%]">
                            {currentTripType === '행사장행'
                              ? selectedHubNameToDestination
                              : currentTripType === '귀가행'
                                ? departureHubNameFromDestination
                                : null}
                          </p>
                        </div>

                        <div className="flex gap-[6px]">
                          {/* 태그 */}
                          <Tag type="arrival" />
                          {/* 하차지 */}
                          <p className="text-22 font-600 leading-[140%]">
                            {currentTripType === '행사장행'
                              ? arrivalHubNameToDestination
                              : currentTripType === '귀가행'
                                ? selectedHubNameFromDestination
                                : null}
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
                    {currentTripType === '행사장행' && (
                      <p className="text-20 font-600 leading-[140%]">
                        {dayjs(boardingTimeToDestination)
                          .locale('ko')
                          .format('YYYY.MM.DD (ddd) HH:mm')}
                        <span className="text-14 font-500 leading-[160%] text-basic-grey-400">
                          ~
                          {dayjs(arrivalTimeToDestination)
                            .locale('ko')
                            .format('HH:mm')}
                        </span>
                      </p>
                    )}
                    {currentTripType === '귀가행' && (
                      <p className="text-20 font-600 leading-[140%]">
                        {dayjs(boardingTimeFromDestination)
                          .locale('ko')
                          .format('YYYY.MM.DD (ddd) HH:mm')}
                        <span className="text-14 font-500 leading-[160%] text-basic-grey-400">
                          ~
                          {dayjs(arrivalTimeFromDestination)
                            .locale('ko')
                            .format('HH:mm')}
                        </span>
                      </p>
                    )}
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
                        {currentTripType === '행사장행'
                          ? durationToDestination
                          : currentTripType === '귀가행'
                            ? durationFromDestination
                            : null}
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
                    type="button"
                    className="flex w-full items-center gap-4 rounded-b-[8px] bg-basic-grey-50 px-16 py-12"
                    onClick={() => handleExternalLink(KAKAO_CHANNEL_URL)}
                  >
                    <InfoIcon />
                    <h2 className="text-14 font-600 leading-[140%] text-basic-grey-600">
                      핸디버스 채널 문의하기
                    </h2>
                  </button>
                </div>
              </div>
            )}

            {/* 주의사항 */}
            <div className="px-[22px]">
              <section className="rounded-[8px] bg-[#F7F8F91A] px-16 py-8 ">
                <p className="text-14 font-500 leading-[160%] text-basic-grey-600">
                  탑승 시간은 현장 운영 상황에 따라 변경될 수 있으며, 변경 시
                  카카오톡 및 문자로 안내가 이루어집니다.
                </p>
              </section>
            </div>
          </div>

          <AntiCapture />
        </article>
      </main>
    </>
  );
};

export default TicketDetail;

const AntiCapture = () => {
  return (
    <section className="py-8">
      <div className="relative h-[34px] overflow-hidden">
        <div className="absolute animate-scroll-right whitespace-nowrap">
          <span className="text-24 font-700 leading-[140%] text-brand-primary-600">
            핸디버스 탑승권 핸디버스 탑승권 핸디버스 탑승권 핸디버스 탑승권
            핸디버스 탑승권 핸디버스 탑승권 핸디버스 탑승권 핸디버스 탑승권
          </span>
        </div>
      </div>
    </section>
  );
};

const Tag = ({ type }: { type: 'departure' | 'arrival' }) => {
  const tagText = type === 'departure' ? '출발' : '도착';

  return (
    <div className=" mt-4 h-fit w-fit whitespace-nowrap rounded-[10px] border border-basic-grey-200 px-8 py-4 text-10 font-600 leading-[160%] text-basic-grey-700">
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
