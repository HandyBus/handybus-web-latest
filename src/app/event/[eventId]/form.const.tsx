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
  '[기타] 예약 가능 시/도',
  '[기타] 복수 노선',
  '[기타] 빈자리 알림',
  '[기타] 노선 내 정류장',
  '[기타] 상품 선택',
  '[기타] 이름 입력',
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
    title: '요청하는 정류장을 선택하세요',
  },
  '[수요조사] 좌석 선택': {
    title: '이용 방향을 선택해 주세요',
  },
  '[수요조사] 정류장 정보': {
    title: '이 곳에 셔틀을 요청할까요?',
    description: '셔틀이 열리는 즉시 알려드려요.',
  },
  // 예약
  '[예약] 정류장 선택': {
    title: '원하는 정류장을 선택하세요',
  },
  '[예약] 좌석 선택': {
    title: '이용 방향을 선택해 주세요',
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
    description: '셔틀이 열릴 수 있도록 수요를 확인하고 있어요.',
  },
  '[기타] 예약 가능 시/도': {
    title: '현재 예약이 가능한 지역이에요',
  },
  '[기타] 복수 노선': {
    title: '원하는 정류장을 선택하세요',
    description: '원하는 시간대의 노선을 선택해주세요.',
  },
  '[기타] 빈자리 알림': {
    title: '알림 신청이 완료되었어요',
    description: (input) =>
      `이 정류장은 [${input}]에 포함돼 있어요. 이 노선의 다른 정류장도 알림 신청이 함께 적용돼요.`,
  },
  '[기타] 노선 내 정류장': {
    title: '노선 내 정류장',
  },
  '[기타] 상품 선택': {
    title: '이 지역에는 두 가지 셔틀이 있어요!',
    description: '원하는 셔틀 유형을 골라주세요.',
  },
  '[기타] 이름 입력': {
    title: '결제 전, 본인 이름을 확인해 주세요',
    description:
      '핸디버스는 2025.07.29부터 실명제로 운행돼요. 작성하신 이름은 프로필에도 적용해 드릴게요.',
  },
} as const;

export const DANGER_SEAT_THRESHOLD = 3;
