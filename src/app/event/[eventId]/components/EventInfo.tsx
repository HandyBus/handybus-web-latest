'use client';

import Badge from '@/components/badge/Badge';
import { EventsViewEntity } from '@/types/event.type';
import { dateString } from '@/utils/dateString.util';
import { getPhaseAndEnabledStatus } from '@/utils/event.util';
import { EVENT_CHEER_UP_TEST_EVENT_ID } from '../event-cheer-up.const';

interface Props {
  event: EventsViewEntity;
  isReservationClosingSoon: boolean;
}

const EventInfo = ({ event, isReservationClosingSoon }: Props) => {
  if (event.eventId === EVENT_CHEER_UP_TEST_EVENT_ID) {
    return <EventCheerUpInfo event={event} />;
  }

  const parsedDateString = dateString(
    event.dailyEvents.map((v) => v.date),
    {
      showWeekday: false,
    },
  );

  const { phase, enabledStatus } = getPhaseAndEnabledStatus(event);

  return (
    <>
      <section className="flex flex-col px-16 py-24">
        <h1 className="mb-4 text-20 font-700">{event.eventName}</h1>
        <h3 className="mb-[2px] text-16 font-500 text-basic-grey-700">
          {parsedDateString}
        </h3>
        <h4 className="mb-4 text-16 font-500 text-basic-grey-500">
          {event.eventLocationName}
        </h4>
        {enabledStatus === 'enabled' &&
          (phase === 'reservation' ? (
            <div className="flex items-center gap-4">
              <h5 className="text-20 font-600">
                {event.eventMinRoutePrice?.toLocaleString()}원~
              </h5>
              {isReservationClosingSoon && (
                <Badge className="bg-basic-red-100 text-basic-red-400">
                  마감임박
                </Badge>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-20 font-600 text-basic-grey-500">
                판매 대기
              </span>
              <Badge className="bg-basic-blue-100 text-basic-blue-400">
                수요조사 진행 중
              </Badge>
            </div>
          ))}
        {enabledStatus === 'disabled' &&
          (phase === 'reservation' ? (
            <span className="text-20 font-600 text-basic-grey-500">
              예약 마감
            </span>
          ) : (
            <span className="text-20 font-600 text-basic-grey-500">
              수요조사 불가
            </span>
          ))}
      </section>
    </>
  );
};

export default EventInfo;

// 할인 목표 설정
const DISCOUNT_GOALS = [
  { participants: 3000, discountRate: 3 },
  { participants: 7000, discountRate: 5 },
  { participants: 10000, discountRate: 7 },
  { participants: 20000, discountRate: 10 },
] as const;

// MOCK 데이터
const MOCK_CURRENT_PARTICIPANTS = 4500; // 현재 참여 수

interface EventCheerUpInfoProps {
  event: EventsViewEntity;
}

const EventCheerUpInfo = ({ event }: EventCheerUpInfoProps) => {
  const parsedDateString = dateString(
    event.dailyEvents.map((v) => v.date),
    {
      showWeekday: false,
    },
  );

  // 현재 달성된 할인율 계산
  const getCurrentDiscountRate = () => {
    for (let i = DISCOUNT_GOALS.length - 1; i >= 0; i--) {
      if (MOCK_CURRENT_PARTICIPANTS >= DISCOUNT_GOALS[i].participants) {
        return DISCOUNT_GOALS[i].discountRate;
      }
    }
    return 0;
  };

  // 다음 목표 정보 계산
  const getNextGoal = () => {
    const currentDiscountRate = getCurrentDiscountRate();
    const nextGoal = DISCOUNT_GOALS.find(
      (goal) => goal.discountRate > currentDiscountRate,
    );

    if (!nextGoal) {
      return null; // 모든 목표 달성
    }

    const remainingParticipants =
      nextGoal.participants - MOCK_CURRENT_PARTICIPANTS;
    const currentGoalIndex = DISCOUNT_GOALS.findIndex(
      (goal) => goal.discountRate === currentDiscountRate,
    );

    // 현재 목표 대비 진행률 계산
    const progressStart =
      currentGoalIndex > 0
        ? DISCOUNT_GOALS[currentGoalIndex - 1].participants
        : 0;
    const progressEnd = nextGoal.participants;
    const progressRange = progressEnd - progressStart;
    const currentProgress = MOCK_CURRENT_PARTICIPANTS - progressStart;
    const progressPercentage = Math.min(
      Math.max((currentProgress / progressRange) * 100, 0),
      100,
    );

    return {
      ...nextGoal,
      remainingParticipants,
      progressPercentage,
      progressStart,
      progressEnd,
    };
  };

  const currentDiscountRate = getCurrentDiscountRate();
  const nextGoal = getNextGoal();

  return (
    <section className="flex flex-col gap-16 px-16 py-24">
      {/* 행사 정보 */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-20 font-700">{event.eventName}</h1>
          <Badge className="bg-brand-primary-50 text-brand-primary-400">
            응원 기간
          </Badge>
        </div>
        <h3 className="text-16 font-500 text-basic-grey-700">
          {parsedDateString}
        </h3>
        <h4 className="text-16 font-500 text-basic-grey-500">
          {event.eventLocationName}
        </h4>
      </div>

      {/* 할인율 및 목표 정보 */}
      <div className="flex flex-col gap-16">
        {/* 할인율 카드 */}
        <div className="flex flex-col gap-12 rounded-12 border border-basic-grey-100 bg-basic-white p-16">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-4">
              <div className="text-14 font-500 text-basic-grey-600">
                현재 달성 할인율
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-basic-grey-900 text-32 font-700">
                  {currentDiscountRate}%
                </span>
                <span className="text-16 font-500 text-basic-grey-500">
                  할인
                </span>
              </div>
            </div>
            {nextGoal && (
              <div className="flex flex-col items-end gap-4">
                <div className="text-12 font-500 text-basic-grey-600">
                  다음 목표
                </div>
                <div className="text-18 font-700 text-brand-primary-400">
                  {nextGoal.discountRate}%
                </div>
              </div>
            )}
          </div>

          {/* 진행률 바 */}
          {nextGoal && (
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <span className="text-12 font-500 text-basic-grey-600">
                  {nextGoal.progressPercentage.toFixed(0)}% 진행
                </span>
                <span className="text-12 font-500 text-basic-grey-400">
                  {nextGoal.remainingParticipants.toLocaleString()}명 남음
                </span>
              </div>
              <div className="relative h-[24px] w-full overflow-hidden rounded-[40px] bg-basic-grey-100">
                <div
                  className="h-full rounded-[40px] transition-all duration-500 ease-out"
                  style={{
                    width: `${nextGoal.progressPercentage}%`,
                    background:
                      'linear-gradient(90deg, rgb(128 255 223) 0%, rgb(0 224 168) 100%)',
                  }}
                />
                {/* 목표 지점 마커 */}
                <div
                  className="absolute top-0 h-full w-[2px] bg-brand-primary-400 opacity-50"
                  style={{ left: '100%' }}
                />
              </div>
              <div className="flex items-center justify-between text-10 font-500 text-basic-grey-400">
                <span>{nextGoal.progressStart.toLocaleString()}명</span>
                <span>{nextGoal.progressEnd.toLocaleString()}명</span>
              </div>
            </div>
          )}

          {/* 모든 목표 달성 시 */}
          {!nextGoal && (
            <div className="flex items-center justify-center rounded-8 bg-brand-primary-50 py-12">
              <span className="text-14 font-600 text-brand-primary-400">
                🎉 최대 할인율 달성!
              </span>
            </div>
          )}
        </div>

        {/* 참여 수 정보 */}
        <div className="text-center text-14 font-500 text-basic-grey-600">
          현재 {MOCK_CURRENT_PARTICIPANTS.toLocaleString()}명이 응원 중이에요
        </div>
      </div>
    </section>
  );
};
