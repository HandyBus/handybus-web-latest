# 수요조사 이탈 추적 (Demand Funnel Tracking)

## 개요

GA4에서 수요조사 단계별 이탈을 측정하여 사용자 행동을 분석하고 개선점을 찾기 위한 추적 시스템입니다.

## 수요조사 플로우

```
수요조사 참여하기 버튼 클릭 → 바텀시트 등장 → 날짜 선택 → 시/도 선택 → 정류장 선택 → 방향 선택 → 셔틀 요청 확정
```

## 추적되는 이벤트

### 1. 단계 진입 이벤트 (`demand_step_enter`)

사용자가 각 수요조사 단계에 진입할 때 발생

**파라미터:**

- `event_category`: 'demand_funnel'
- `demand_step`: 진입한 단계
- `event_id`: 이벤트 ID
- `event_name`: 이벤트 이름
- `timestamp`: 진입 시각

**단계 구분:**

- `demand_start`: 수요조사 참여하기 버튼 클릭
- `date_selection`: 날짜 선택
- `sido_selection`: 시/도 선택
- `hub_selection`: 정류장 선택
- `trip_type_selection`: 방향 선택 (가는편/오는편/왕복)
- `demand_complete`: 셔틀 요청 확정

### 2. 이탈 이벤트 (`demand_exit`)

사용자가 수요조사 과정에서 이탈할 때 발생

**파라미터:**

- `event_category`: 'demand_funnel'
- `demand_step`: 이탈한 단계
- `exit_type`: 이탈 방식
- `event_id`: 이벤트 ID
- `event_name`: 이벤트 이름
- `time_spent_ms`: 해당 단계에서 소요한 시간 (밀리초)
- `timestamp`: 이탈 시각

**이탈 방식 구분:**

- `page_leave`: 페이지 이동, 새로고침, 브라우저 닫기
- `bottom_sheet_close`: 바텀시트 닫힘 (드래그, ESC 키 등)

### 3. 완료 이벤트 (`demand_complete`)

수요조사가 성공적으로 완료되었을 때 발생

**파라미터:**

- `event_category`: 'demand_funnel'
- `event_id`: 이벤트 ID
- `event_name`: 이벤트 이름
- `selected_hub`: 선택한 정류장명
- `trip_type`: 선택한 방향 (ROUND_TRIP, TO_DESTINATION, FROM_DESTINATION)
- `total_time_ms`: 전체 수요조사 소요 시간 (밀리초)
- `timestamp`: 완료 시각

## 구현된 파일들

### 1. `src/utils/analytics/analytics.util.ts`

- GA4 이벤트 전송 함수들
- `trackDemandStepEnter()`: 단계 진입 추적
- `trackDemandExit()`: 이탈 추적
- `trackDemandComplete()`: 완료 추적

### 2. `src/hooks/useDemandTracking.tsx`

- 수요조사 추적 로직을 담은 커스텀 훅
- 단계별 시간 측정
- 페이지 이탈 감지 (beforeunload, visibilitychange)
- 바텀시트 닫힘 감지

### 3. `src/app/event/[eventId]/components/event-form/EventForm.tsx`

- 수요조사 추적 훅 통합
- 바텀시트 열기/닫기 시 추적 호출
- 단계별 진입 추적 함수 전달

### 4. `src/app/event/[eventId]/components/steps/StepComponent.tsx`

- 각 수요조사 단계에서 진입 추적 호출
- DemandHubInfoStep에 완료 추적 함수 전달

### 5. `src/app/event/[eventId]/components/steps/demand-steps/DemandHubInfoStep.tsx`

- 수요조사 완료 시 추적 호출

### 6. `src/hooks/useBottomSheet.tsx`

- outside click 감지를 위한 `onOutsideClick` 콜백 추가

### 7. `src/components/bottom-sheet/BottomSheet.tsx`

- 뒤로가기 버튼 클릭 감지를 위한 `onBackClick` 콜백 추가

## 사용 방법

### 1. 기본 설정

```tsx
import { useDemandTracking } from '@/hooks/useDemandTracking';

const { trackStepEnter, trackExit, trackComplete } = useDemandTracking({
  eventId: 'event-123',
  eventName: '콘서트 이름',
  isBottomSheetOpen: true,
});
```

### 2. 단계 진입 추적

```tsx
// 단계 변경 시 호출
trackStepEnter('hub_selection');
```

### 3. 이탈 추적

```tsx
// 특정 이탈 상황에서 호출
trackExit('page_leave');
```

### 4. 완료 추적

```tsx
// 수요조사 성공 시 호출
trackComplete('강남역 1번 출구', 'ROUND_TRIP');
```

## GA4에서 확인 방법

### 1. 실시간 보고서

- GA4 > 실시간 > 이벤트에서 `demand_step_enter`, `demand_exit`, `demand_complete` 이벤트 확인

### 2. 맞춤 보고서 생성

```
차원: demand_step, exit_type, event_name
측정항목: 이벤트 수, 사용자 수
```

### 3. 퍼널 분석

```
1. demand_start (수요조사 시작)
2. date_selection (날짜 선택)
3. sido_selection (시/도 선택)
4. hub_selection (정류장 선택)
5. trip_type_selection (방향 선택)
6. demand_complete (완료)
```

## 기대 효과

1. **단계별 이탈률 파악**: 어느 단계에서 사용자가 가장 많이 이탈하는지 확인
2. **이탈 원인 분석**: 이탈 방식별로 문제점 파악 (UX 개선점 도출)
3. **완료율 개선**: 병목 구간을 개선하여 수요조사 완료율 향상
4. **사용자 행동 이해**: 각 단계별 소요 시간을 통한 사용자 경험 분석

## 주의사항

1. **ga4 파라미터 글자 제한**: 이벤트명과 정류장명은 100자로 제한하여 전송