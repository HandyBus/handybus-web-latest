'use client';

import Button from '@/components/buttons/button/Button';
import Loading from '@/components/loading/Loading';
import { useGetUserReservation } from '@/services/reservation.service';
import ArrowIcon from './icons/white-arrow-right.svg';
import InfoIcon from '/public/icons/info.svg';
import { KAKAO_CHANNEL_URL } from '@/constants/common';
import { useEffect, useState } from 'react';
import { handleClickAndStopPropagation } from '@/utils/common.util';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import useBoardingPassData from './hooks/useBoardingPassData';

interface Props {
  params: {
    reservationId: string;
  };
}

const BoardingPassPage = ({ params }: Props) => {
  const { reservationId } = params;
  const router = useRouter();
  const { data, isLoading: isReservationLoading } =
    useGetUserReservation(reservationId);
  const reservation = data?.reservation;
  const isShuttleEnded = reservation?.shuttleRoute.status === 'ENDED';
  const isCanceled = reservation?.reservationStatus === 'CANCEL';

  const isLoading = isReservationLoading;

  useEffect(() => {
    if (!isLoading && !reservation) {
      router.replace('/mypage/shuttle?type=reservation');
      return;
    }
  }, [isLoading, router, reservationId, reservation]);

  if (isLoading) {
    return <Loading />;
  }
  if (isShuttleEnded || isCanceled) {
    router.replace('/mypage/shuttle?type=reservation');
  }
  if (!reservation) {
    return null;
  }
  return <BoardingPass reservation={reservation} />;
};

interface BoardingPassProps {
  reservation: ReservationsViewEntity;
}

const BoardingPass = ({ reservation }: BoardingPassProps) => {
  const [currentTripType, setCurrentTripType] = useState<
    '행사장행' | '귀가행'
  >();
  useEffect(() => {
    setCurrentTripType(
      reservation?.type === 'ROUND_TRIP'
        ? '행사장행' // 왕복일 경우 첫 페이지 티켓은 행사장행
        : reservation?.type === 'TO_DESTINATION'
          ? '행사장행'
          : reservation?.type === 'FROM_DESTINATION'
            ? '귀가행'
            : undefined,
    );
  }, [reservation]);

  const {
    isRoundTrip,
    shuttleName,
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
    noticeRoomUrl,
    openOpenChatLink,
  } = useBoardingPassData(reservation);

  return (
    // 피시와 모바일 환경 모두에서 화면 높이를 설정
    <main className="min-h-[100dvh] min-h-screen bg-basic-black">
      <aside className="bg-basic-red-100 px-16 py-8 text-center text-16 font-600 leading-[160%] text-basic-red-400">
        캡쳐화면은 탑승이 제한될 수 있습니다.
      </aside>

      <article className="flex flex-col gap-16">
        <AntiCapture />

        <div className="flex flex-col gap-24 px-[22px]">
          <div className="rounded-[8px] bg-basic-white">
            {/* 여정타입 */}
            <section className="flex justify-between rounded-t-[8px] bg-brand-primary-400 p-16 ">
              <h1 className="text-20 font-700 leading-[140%] text-basic-white">
                {isRoundTrip ? `왕복 | ${currentTripType}` : currentTripType}
              </h1>
              {isRoundTrip && currentTripType && (
                <div className="flex items-center gap-8 text-18 font-500 leading-[160%] text-basic-white">
                  <button
                    onClick={() => setCurrentTripType('행사장행')}
                    disabled={currentTripType === '행사장행'}
                  >
                    <ArrowIcon
                      className={`rotate-180 ${
                        currentTripType === '행사장행' ? 'opacity-50' : ''
                      }`}
                    />
                  </button>
                  {currentTripType === '행사장행' ? 1 : 2}/2
                  <button
                    onClick={() => setCurrentTripType('귀가행')}
                    disabled={currentTripType === '귀가행'}
                  >
                    <ArrowIcon
                      className={`${
                        currentTripType === '귀가행' ? 'opacity-50' : ''
                      }`}
                    />
                  </button>
                </div>
              )}
            </section>

            {/* 탑승지/하차지 */}
            <section className="flex flex-col gap-8 px-16 py-24">
              <h2 className="text-16 font-600 leading-[140%] text-basic-grey-700">
                {shuttleName}
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
                    <p className="text-24 font-700 leading-[140%]">
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
                    <p className="text-24 font-700 leading-[140%]">
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
            <section className="flex flex-col gap-8 px-16 py-24">
              <h2 className="text-14 font-600 leading-[140%] text-basic-grey-400">
                탑승일시
              </h2>
              {currentTripType === '행사장행' && (
                <p className="text-24 font-700 leading-[140%]">
                  {dayjs(boardingTimeToDestination)
                    .locale('ko')
                    .format('YYYY.MM.DD (ddd) HH:mm')}
                  <span className="text-16 font-500 leading-[160%] text-basic-grey-400">
                    ~
                    {dayjs(arrivalTimeToDestination)
                      .locale('ko')
                      .format('HH:mm')}
                  </span>
                </p>
              )}
              {currentTripType === '귀가행' && (
                <p className="text-24 font-700 leading-[140%]">
                  {dayjs(boardingTimeFromDestination)
                    .locale('ko')
                    .format('YYYY.MM.DD (ddd) HH:mm')}
                  <span className="text-16 font-500 leading-[160%] text-basic-grey-400">
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
              <div className="absolute -left-[16px] top-1/2 h-[32px] w-[32px] -translate-y-1/2 rounded-full bg-basic-black"></div>
              <div className="absolute -right-[16px] top-1/2 h-[32px] w-[32px] -translate-y-1/2 rounded-full bg-basic-black"></div>
              <div className="mx-16 border-[1px] border-dashed border-basic-grey-300"></div>
            </div>

            {/* 탑승인원, 예상소요시간 및 좌석 */}
            <section className="grid grid-cols-2 gap-16 px-16 py-24">
              <div className="flex flex-col gap-8">
                <h2 className="text-14 font-600 leading-[140%] text-basic-grey-400">
                  탑승자 정보
                </h2>
                <div className="text-18 font-600 leading-[160%]">
                  <span className="block">{userName}</span>
                  <span className="block">({userPhoneNumber})</span>
                </div>
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
                  좌석
                </h2>
                <p className="text-18 font-600 leading-[160%]">자율석</p>
              </div>
            </section>

            {/* 핸디버스 채널 문의하기 */}
            <a
              className="flex w-full items-center gap-[6px] rounded-b-[8px] bg-basic-grey-50 px-16 py-24"
              href={KAKAO_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InfoIcon />
              <h2 className="text-16 font-600 leading-[140%] text-basic-grey-600">
                핸디버스 채널 문의하기
              </h2>
            </a>
          </div>

          {/* 카카오톡 공지방 참여하기 */}
          {noticeRoomUrl && (
            <Button
              variant="primary"
              size="large"
              onClick={handleClickAndStopPropagation(() => {
                openOpenChatLink();
              })}
              disabled={!noticeRoomUrl}
            >
              카카오톡 공지방 참여하기
            </Button>
          )}

          {/* 주의사항 */}
          <aside className="rounded-[8px] bg-basic-grey-50 p-8 pl-28 text-14 font-500 leading-[160%] text-basic-grey-500">
            <ul>
              <li className="list-disc pl-4 marker:text-basic-grey-500">
                탑승 시간은 현장 운영 상황에 따라 변경될 수 있으며, 관련된 모든
                사항은 카카오톡 공지방에서 안내가 이루어집니다. 불참으로 인한
                불이익은 책임지지 않습니다.
              </li>
            </ul>
          </aside>
        </div>

        <AntiCapture />
      </article>
    </main>
  );
};

export default BoardingPassPage;

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

import PinIcon from './icons/pin-primary.svg';
import DotPrimaryIcon from './icons/dot-primary.svg';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { useRouter } from 'next/navigation';

const SimpleRouteLine = () => {
  return (
    <section className="flex h-full flex-col justify-between pb-16 pt-8">
      <div className="relative z-10 h-[11px]">
        <DotPrimaryIcon />
      </div>
      <div className="my-[-2px] ml-4 h-full w-[2px] bg-brand-primary-400" />
      <div className="relative z-10 h-[11px]">
        <PinIcon />
      </div>
    </section>
  );
};
