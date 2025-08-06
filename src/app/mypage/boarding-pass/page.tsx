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
import { useGetUser } from '@/services/user.service';

interface Props {
  searchParams: {
    reservationId: string;
  };
}

const BoardingPassPage = ({ searchParams }: Props) => {
  const { reservationId } = searchParams;
  const [currentTripType, setCurrentTripType] = useState<'가는편' | '오는편'>();
  const {
    data,
    isLoading: isReservationLoading,
    isError: isReservationError,
  } = useGetUserReservation(reservationId);
  const reservation = data?.reservation;

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUser();

  useEffect(() => {
    if (!reservation) return;
    setCurrentTripType(
      reservation?.type === 'ROUND_TRIP'
        ? '가는편'
        : reservation?.type === 'TO_DESTINATION'
          ? '가는편'
          : reservation?.type === 'FROM_DESTINATION'
            ? '오는편'
            : undefined,
    );
  }, [reservation]);

  const isUserMe = user?.userId === data?.reservation.userId;
  const isLoading = isReservationLoading || isUserLoading;
  const isError = isReservationError || isUserError;

  if (isLoading) return <Loading />;
  if (!isUserMe && isError)
    throw new Error('유효하지 않은 데이터 혹은 잘못된 접근입니다');

  const isRoundTrip = reservation?.type === 'ROUND_TRIP';

  const shuttleName = reservation?.shuttleRoute.name;
  const fromDestinationShuttleRouteHubs =
    reservation?.shuttleRoute.fromDestinationShuttleRouteHubs;
  const toDestinationShuttleRouteHubs =
    reservation?.shuttleRoute.toDestinationShuttleRouteHubs;

  const selectedHubToDestination = reservation?.toDestinationShuttleRouteHubId;
  const selectedHubFromDestination =
    reservation?.fromDestinationShuttleRouteHubId;

  const selectedHubNameToDestination = toDestinationShuttleRouteHubs?.find(
    (hub) => hub.shuttleRouteHubId === selectedHubToDestination,
  )?.name;
  const selectedHubNameFromDestination = fromDestinationShuttleRouteHubs?.find(
    (hub) => hub.shuttleRouteHubId === selectedHubFromDestination,
  )?.name;

  const arrivalHubNameToDestination =
    toDestinationShuttleRouteHubs?.[toDestinationShuttleRouteHubs?.length - 1]
      ?.name;
  const departureHubNameFromDestination =
    fromDestinationShuttleRouteHubs?.[0]?.name;

  const boardingTimeToDestination =
    reservation?.shuttleRoute.toDestinationShuttleRouteHubs?.find(
      (hub) => hub.shuttleRouteHubId === selectedHubToDestination,
    )?.arrivalTime;
  const arrivalTimeToDestination =
    reservation?.shuttleRoute.toDestinationShuttleRouteHubs?.[
      reservation?.shuttleRoute.toDestinationShuttleRouteHubs?.length - 1
    ]?.arrivalTime;

  const boardingTimeFromDestination =
    reservation?.shuttleRoute.fromDestinationShuttleRouteHubs?.[0]?.arrivalTime;
  const arrivalTimeFromDestination =
    reservation?.shuttleRoute.fromDestinationShuttleRouteHubs?.find(
      (hub) => hub.shuttleRouteHubId === selectedHubFromDestination,
    )?.arrivalTime;

  const formatDuration = (duration: number) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours > 0 ? `${hours}시간 ` : ''}${minutes}분`;
  };

  const durationToDestination = formatDuration(
    dayjs(arrivalTimeToDestination).diff(
      dayjs(boardingTimeToDestination),
      'minute',
    ),
  );

  const durationFromDestination = formatDuration(
    dayjs(arrivalTimeFromDestination).diff(
      dayjs(boardingTimeFromDestination),
      'minute',
    ),
  );

  const dailyEvent = reservation?.shuttleRoute.event.dailyEvents.find(
    (dailyEvent) =>
      dailyEvent.dailyEventId === reservation?.shuttleRoute.dailyEventId,
  );
  const noticeRoomUrl = dailyEvent?.metadata?.openChatUrl;

  const openOpenChatLink = () => {
    if (noticeRoomUrl) {
      window.open(noticeRoomUrl, '_blank', 'noopener,noreferrer');
    }
  };

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
                    onClick={() => setCurrentTripType('가는편')}
                    disabled={currentTripType === '가는편'}
                  >
                    <ArrowIcon
                      className={`rotate-180 ${
                        currentTripType === '가는편' ? 'opacity-50' : ''
                      }`}
                    />
                  </button>
                  {currentTripType === '가는편' ? 1 : 2}/2
                  <button
                    onClick={() => setCurrentTripType('오는편')}
                    disabled={currentTripType === '오는편'}
                  >
                    <ArrowIcon
                      className={`${
                        currentTripType === '오는편' ? 'opacity-50' : ''
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
                    {/* 탑승지/하차지 */}
                    <p className="text-24 font-700 leading-[140%]">
                      {currentTripType === '가는편'
                        ? selectedHubNameToDestination
                        : currentTripType === '오는편'
                          ? departureHubNameFromDestination
                          : null}
                    </p>
                  </div>

                  <div className="flex gap-[6px]">
                    {/* 태그 */}
                    <Tag type="arrival" />
                    {/* 탑승지/하차지 */}
                    <p className="text-24 font-700 leading-[140%]">
                      {currentTripType === '가는편'
                        ? arrivalHubNameToDestination
                        : currentTripType === '오는편'
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
              {currentTripType === '가는편' && (
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
              {currentTripType === '오는편' && (
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

            {/* 예상소요시간 및 좌석 */}
            <section className="flex flex-col gap-16 px-16 py-24">
              <div className="flex flex-col gap-8">
                <h2 className="text-14 font-600 leading-[140%] text-basic-grey-400">
                  예상 소요시간
                </h2>
                <p className="text-18 font-600 leading-[160%]">
                  {currentTripType === '가는편'
                    ? durationToDestination
                    : currentTripType === '오는편'
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
