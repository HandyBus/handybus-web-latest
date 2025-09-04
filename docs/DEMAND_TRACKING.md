# 수요조사 이탈 추적 (Demand Funnel Tracking)

## 개요

GA4에서 수요조사 단계별 이탈을 측정하여 사용자 행동을 분석하고 개선점을 찾기 위한 추적 시스템입니다.

## 수요조사 플로우

```
수요조사 참여하기 버튼 클릭 → 바텀시트 등장 → 날짜 선택 → 시/도 선택 → 정류장 선택 → 방향 선택 → 정류장 정보 확인 → 셔틀 요청 확정
```

## 추적되는 이벤트

### 1. 단계 진입 이벤트 (`enter_demand_step`)

사용자가 각 수요조사 단계에 진입할 때 발생

**파라미터:**

- `event_category`: 'demand_funnel'
- `demand_step`: 진입한 단계
- `event_id`: 이벤트 ID
- `event_name`: 이벤트 이름
- `timestamp`: 진입 시각

**단계 구분:**

- `start_demand`: 수요조사 참여하기 버튼 클릭
- `select_date`: 날짜 선택
- `select_sido`: 시/도 선택
- `select_hub`: 정류장 선택
- `select_trip_type`: 방향 선택 (행사장행/귀가행/왕복)
- `confirm_hub`: 정류장 정보 확인
- `complete_demand`: 셔틀 요청 확정

### 2. 이탈 이벤트 (`abandon_demand`)

사용자가 수요조사 과정에서 이탈할 때 발생

**파라미터:**

- `event_category`: 'demand_funnel'
- `demand_step`: 이탈한 단계
- `exit_type`: 이탈 방식
- `event_id`: 이벤트 ID
- `event_name`: 이벤트 이름
- `total_time_ms`: 수요조사 시작부터 이탈까지의 총 소요 시간 (밀리초)
- `timestamp`: 이탈 시각

**이탈 방식 구분:**

- `page_leave`: 페이지 이동, 새로고침, 브라우저 닫기, 브라우저 뒤로가기/앞으로가기
- `bottom_sheet_close`: 바텀시트 닫힘 (드래그, ESC 키 등)

### 3. 완료 이벤트 (`complete_demand`)

수요조사가 성공적으로 완료되었을 때 발생

**파라미터:**

- `event_category`: 'demand_funnel'
- `event_id`: 이벤트 ID
- `event_name`: 이벤트 이름
- `event_date`: 선택한 이벤트 날짜
- `selected_hub`: 선택한 정류장명
- `trip_type`: 선택한 방향 (ROUND_TRIP, TO_DESTINATION, FROM_DESTINATION)
- `total_time_ms`: 전체 수요조사 소요 시간 (밀리초)
- `timestamp`: 완료 시각

## 구현된 파일들

### 1. `src/utils/analytics/demandAnalytics.util.ts`

- GA4 이벤트 전송 함수들
- `gtagEnterDemandStep()`: 단계 진입 추적
- `gtagExitDemand()`: 이탈 추적
- `gtagCompleteDemand()`: 완료 추적

### 2. `src/hooks/analytics/useDemandTracking.tsx`

- 수요조사 추적 로직을 담은 커스텀 훅
- `trackClickDemandStart()`: 수요조사 시작 추적
- `trackEnterDemandStep()`: 단계 진입 추적
- `trackExitDemandStep()`: 이탈 추적
- `trackCompleteDemandStep()`: 완료 추적
- 전체 수요조사 소요 시간 측정 (start_demand부터 완료까지)
- 페이지 이탈 감지 (beforeunload, visibilitychange, popstate)
- 바텀시트 닫힘 감지

### 3. `src/app/event/[eventId]/components/event-form/EventForm.tsx`

- 수요조사 추적 훅 통합
- 바텀시트 열기 시 `trackClickDemandStart()` 호출
- 단계별 진입 추적 함수와 완료 추적 함수를 StepComponent로 전달

### 4. `src/app/event/[eventId]/components/steps/StepComponent.tsx`

- 각 수요조사 단계에서 `trackEnterDemandStep()` 호출
- DemandHubInfoStep에 완료 추적 함수 전달

### 5. `src/app/event/[eventId]/components/steps/demand-steps/DemandHubInfoStep.tsx`

- 수요조사 성공 시 `trackCompleteDemandStep()` 호출
- 선택한 정류장명, 여행 타입, 이벤트 날짜를 파라미터로 전달

## 사용 방법

### 1. 기본 설정

```tsx
import { useDemandTracking } from '@/hooks/analytics/useDemandTracking';

const {
  trackClickDemandStart,
  trackEnterDemandStep,
  trackExitDemandStep,
  trackCompleteDemandStep,
} = useDemandTracking({
  eventId: 'event-123',
  eventName: '콘서트 이름',
  isBottomSheetOpen: true,
});
```

### 2. 수요조사 시작 추적

```tsx
// 수요조사 참여하기 버튼 클릭 시 호출
trackClickDemandStart();
```

### 3. 단계 진입 추적

```tsx
// 단계 변경 시 호출
trackEnterDemandStep(step: DemandStep);
```

### 4. 이탈 추적

```tsx
// 특정 이탈 상황에서 호출 (자동으로 호출됨)
trackExitDemandStep('page_leave' | 'bottom_sheet_close');
```

### 5. 완료 추적

```tsx
// 수요조사 성공 시 호출
trackCompleteDemandStep(selectedHub: string, tripType: string, eventDate: string);
```

## GA4에서 확인 방법

### 1. 실시간 보고서

- GA4 > 실시간 > 이벤트에서 `enter_demand_step`, `abandon_demand`, `complete_demand` 이벤트 확인

### 2. 맞춤 보고서 생성

```
차원: demand_step, exit_type, event_name
측정항목: 이벤트 수, 사용자 수
```

### 3. 퍼널 분석

```
1. start_demand (수요조사 시작)
2. select_date (날짜 선택)
3. select_sido (시/도 선택)
4. select_hub (정류장 선택)
5. select_trip_type (방향 선택)
6. confirm_hub (정류장 정보 확인)
7. complete_demand (완료)
```

## 기대 효과

1. **단계별 이탈률 파악**: 어느 단계에서 사용자가 가장 많이 이탈하는지 확인
2. **이탈 원인 분석**: 이탈 방식별로 문제점 파악 (UX 개선점 도출)
3. **완료율 개선**: 병목 구간을 개선하여 수요조사 완료율 향상
4. **사용자 행동 이해**: 각 단계별 소요 시간을 통한 사용자 경험 분석

## 주요 변경사항

1. **새로운 단계 추가**: `confirm_hub` 단계가 `select_trip_type`과 `complete_demand` 사이에 추가됨
2. **시간 측정 방식 변경**: 각 단계별 시간이 아닌 전체 수요조사 소요 시간을 측정
3. **함수명 변경**: 더 명확한 함수명으로 변경 (`trackClickDemandStart`, `trackEnterDemandStep` 등)
4. **경로 변경**: 훅 파일이 `src/hooks/analytics/` 폴더로 이동

## 주의사항

1. **GA4 파라미터 글자 제한**: 이벤트명과 정류장명은 100자로 제한하여 전송
2. **단계 진입 추적**: `gtagEnterDemandStep` 함수는 현재 주석 처리되어 있음 (실제 GA4 전송 안됨)
3. **이탈 추적**: 페이지 이탈과 바텀시트 닫힘 모두 자동으로 감지하여 추적함
