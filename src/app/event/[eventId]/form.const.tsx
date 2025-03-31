import { ReactNode } from 'react';
import { DefaultValues } from 'react-hook-form';
import { EventFormValues } from './form.type';

export const EVENT_FORM_DEFAULT_VALUES: DefaultValues<EventFormValues> = {
  dailyEvent: undefined,
  sido: undefined,
  openSido: undefined,
  selectedHubWithInfo: undefined,
  hubsWithInfoForDuplicates: undefined,
  tripType: undefined,
};

export const EVENT_STEPS = [
  // 공통
  '[공통] 일자 선택',
  '[공통] 시/도 선택',
  // 수요조사
  '[수요조사] 정류장 선택',
  '[수요조사] 좌석 선택',
  '[수요조사] 정류장 정보',
  // 예약
  '[예약] 정류장 선택',
  '[예약] 좌석 선택',
  '[예약] 예약 정보',
  // 기타
  '[기타] 시/도 정보',
  '[기타] 예약 불가 지역',
  '[기타] 예약 가능 시/도',
  '[기타] 복수 노선',
  '[기타] 빈자리 알림',
] as const;

export const EVENT_STEPS_TO_TEXT: Record<
  (typeof EVENT_STEPS)[number],
  {
    title: ReactNode | ((input: string) => ReactNode);
    description?: ReactNode | ((input: string) => ReactNode);
  }
> = {
  // 공통
  '[공통] 일자 선택': {
    title: '언제 참가하시나요?',
  },
  '[공통] 시/도 선택': {
    title: '어디서 이용하시나요?',
  },
  // 수요조사
  '[수요조사] 정류장 선택': {
    title: '원하는 정류장을 선택하세요',
  },
  '[수요조사] 좌석 선택': {
    title: '언제 셔틀을 이용하시나요?',
  },
  '[수요조사] 정류장 정보': {
    title: '이 곳에 셔틀을 요청할까요?',
    description: '이 정류장에서 셔틀이 열리면 바로 알려드릴게요.',
  },
  // 예약
  '[예약] 정류장 선택': {
    title: '원하는 정류장을 선택하세요',
  },
  '[예약] 좌석 선택': {
    title: '언제 셔틀을 이용하시나요?',
  },
  '[예약] 예약 정보': {
    title: '이 셔틀로 예약을 진행할게요',
  },
  // 기타
  '[기타] 시/도 정보': {
    title: (input) => {
      const lastChar = input[input.length - 1];
      const hasBatchim = (lastChar.charCodeAt(0) - 44032) % 28 !== 0; // 받침 여부 체크
      return (
        <>
          {`${input}${hasBatchim ? '은 ' : '는 '}`}{' '}
          <span className="text-brand-primary-400">수요조사</span> 진행 중
        </>
      );
    },
    description: '셔틀이 필요한 인원과 정류장을 확인하고 있어요.',
  },
  '[기타] 예약 불가 지역': {
    title: '예약 가능한 정류장이 없어요.',
    description:
      '아쉽게도 이 지역에서는 충분한 인원이 모이지 않았어요. 내 지역 근방에서 예약 가능한 셔틀을 살펴보세요.',
  },
  '[기타] 예약 가능 시/도': {
    title: '현재 예약이 가능한 지역이에요',
  },
  '[기타] 복수 노선': {
    title: (input) => `${input}개의 노선이 있어요`,
    description: (input) =>
      `${input} 정류장을 지나는 셔틀 중 원하는 시간을 선택하세요.`,
  },
  '[기타] 빈자리 알림': {
    title: '알림이 신청되었어요!',
    description: '빈자리를 예약할 수 있을 때 바로 알려드릴게요.',
  },
} as const;

export const DANGER_SEAT_THRESHOLD = 3;
