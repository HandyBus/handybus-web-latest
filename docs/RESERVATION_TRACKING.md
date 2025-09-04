# 예약 추적 (Reservation Funnel Tracking)

## 개요

GA4에서 예약 단계별 이탈을 측정하여 사용자 행동을 분석하고 개선점을 찾기 위한 추적 시스템입니다. 수요조사와 달리 실제 결제까지 이어지는 전체 예약 퍼널을 추적합니다.

## 추적되는 단계

### 일반 예약 단계

- `select_date`: 날짜 선택
- `select_sido`: 시/도 선택
- `select_product`: 상품 선택
- `select_hub`: 정류장 선택
- `select_multiple_routes`: 복수 노선 선택
- `select_trip_type`: 좌석 선택 (행사장행/귀가행/왕복)
- `hub_info`: 예약 정보 확인

### 핸디팟 전용 단계

- `handy_party_select_trip_type`: 방향 선택
- `handy_party_select_address`: 주소 입력
- `handy_party_select_map`: 지도
- `handy_party_select_reservation_info`: 예약 확인

### 공통 단계 (결제)

- `write_name`: 실명 입력
- `payment`: 결제 페이지
- `request_payment`: 결제 요청
- `success_payment`: 결제 성공

## 추적되는 이벤트

### 1. 예약 시작 이벤트 (`enter_reservation`)

사용자가 예약 프로세스를 시작할 때 발생

**파라미터:**

- `event_category`: 'reservation_funnel'
- `event_id`: 이벤트 ID
- `event_name`: 이벤트 이름 (100자 제한)
- `current_scroll_depth`: 예약 시작 시점의 스크롤 깊이 (0-100)
- `max_scroll_depth`: 세션 내 최대 스크롤 깊이 (0-100)
- `timestamp`: 시작 시각

### 2. 예약 이탈 이벤트 (`abandon_reservation`)

사용자가 예약 과정에서 이탈할 때 발생

**파라미터:**

- `event_category`: 'reservation_funnel'
- `event_id`: 이벤트 ID
- `event_name`: 이벤트 이름 (100자 제한)
- `reservation_step`: 이탈한 단계
- `exit_type`: 이탈 방식
- `total_time_ms`: 예약 시작부터 이탈까지의 총 소요 시간 (밀리초)
- `debug`: 디버그 정보 (페이지 닫기, 탭전환, 뒤로가기 등)
- `timestamp`: 이탈 시각

**이탈 방식 구분:**

- `page_leave`: 페이지 이동, 새로고침, 브라우저 닫기, 브라우저 뒤로가기/앞으로가기
- `bottom_sheet_close`: 바텀시트 닫힘 (드래그, ESC 키 등)

### 3. 예약 완료 이벤트 (`complete_reservation`)

예약이 성공적으로 완료되었을 때 발생

**파라미터:**

- `event_category`: 'reservation_funnel'
- `event_id`: 이벤트 ID
- `event_name`: 이벤트 이름 (100자 제한)
- `event_date`: 선택한 이벤트 날짜
- `selected_hub_to_destination`: 선택한 행사장행 정류장명
- `selected_hub_from_destination`: 선택한 귀가행 정류장명
- `trip_type`: 선택한 방향 (ROUND_TRIP, TO_DESTINATION, FROM_DESTINATION)
- `has_other_event_reservation`: 다른 이벤트 예약 여부
- `payment_id`: 결제 ID
- `total_time_ms`: 전체 예약 소요 시간 (밀리초)
- `timestamp`: 완료 시각

## 구현된 파일들

### 1. `src/utils/analytics/reservationAnalytics.util.ts`

GA4 이벤트 전송 함수들

**주요 함수:**

- `gtagEnterReservation()`: 예약 시작 추적
- `gtagAbandonReservation()`: 예약 이탈 추적
- `gtagCompleteReservation()`: 예약 완료 추적

**타입 정의:**

- `ReservationStep`: 예약 단계 타입

### 2. `src/hooks/analytics/useReservationTracking.ts`

예약 추적 로직을 담은 커스텀 훅

**기능:**

- 예약 시작 시간 관리 (`reservationStartTimeRef`)
- 현재 예약 단계 추적 (`currentStepRef`)
- 의도적 페이지 이동 감지 (`isNavigatingRef`)
- 전체 예약 소요 시간 측정
- 페이지 이탈 자동 감지 (beforeunload, visibilitychange, popstate)
- 바텀시트 닫힘 자동 감지
- 전역 상태 관리 (Jotai atom 활용)

**주요 메서드:**

- `trackEnterReservation()`: 예약 시작 추적
- `setReservationTrackingStep()`: 단계 변경 추적
- `trackCompleteReservation()`: 예약 완료 추적
- `markAsIntentionalNavigation()`: 의도적 이동 마킹 (이탈 추적 방지)
- `getReservationStartTime()`: 예약 시작 시간 조회

### 3. `src/hooks/analytics/store/reservationTracking.store.ts`

예약 추적 메소드들의 전역 상태 관리

**인터페이스:**

```typescript
interface ReservationTrackingMethods {
  trackEnterReservation: () => void;
  setReservationTrackingStep: (eventStep: string) => void;
  trackCompleteReservation: (
    eventDate: string | undefined,
    selectedHubToDestination: string | undefined,
    selectedHubFromDestination: string | undefined,
    tripType: string,
    hasOtherEventReservation: boolean | undefined,
    paymentId: string | undefined,
  ) => void;
  markAsIntentionalNavigation: (hasNoTimeout?: boolean) => void;
  getReservationStartTime: () => string | null;
}
```

### 4. `src/hooks/analytics/store/useReservationTrackingGlobal.ts`

전역 상태에서 예약 추적 메소드들을 사용하는 훅

**기능:**

- Props drilling 없이 어디서든 예약 추적 기능 사용 가능
- 메소드가 없을 경우 안전하게 처리됨 (optional chaining 사용)
- 단순하고 직관적인 API 제공

**사용 예시:**

```typescript
const { trackEnterReservation, setReservationTrackingStep } =
  useReservationTrackingGlobal();

// 예약 시작 추적
trackEnterReservation();

// 단계 변경 추적
setReservationTrackingStep('[예약] 정류장 선택');
```

## 사용 방법

### 1. 기본 설정

```typescript
import { useReservationTracking } from '@/hooks/analytics/useReservationTracking';

const {
  trackEnterReservation,
  setReservationTrackingStep,
  trackCompleteReservation,
  markAsIntentionalNavigation,
  getReservationStartTime,
} = useReservationTracking({
  eventId: 'event-123',
  eventName: '콘서트 이름',
  isBottomSheetOpen: true,
  isActive: true,
});
```

### 2. 전역 훅 사용

```typescript
import { useReservationTrackingGlobal } from '@/hooks/analytics/store/useReservationTrackingGlobal';

const { trackEnterReservation, setReservationTrackingStep } =
  useReservationTrackingGlobal();
```

### 3. 예약 시작 추적

```typescript
// 예약하기 버튼 클릭 시 호출
trackEnterReservation();
```

### 4. 단계 변경 추적

```typescript
// 단계 변경 시 호출
setReservationTrackingStep('[예약] 정류장 선택');
setReservationTrackingStep('[핸디팟] 주소 입력');
```

### 5. 의도적 이동 마킹

```typescript
// 페이지 이동 전에 호출하여 이탈로 집계되지 않도록 함
markAsIntentionalNavigation();
// 또는 타임아웃 없이 영구적으로 마킹
markAsIntentionalNavigation(true);
```

### 6. 예약 완료 추적

```typescript
// 결제 성공 시 호출
trackCompleteReservation(
  eventDate, // 이벤트 날짜
  hubToDestination, // 행사장행 정류장
  hubFromDestination, // 귀가행 정류장
  tripType, // 여행 타입
  hasOtherReservation, // 다른 예약 여부
  paymentId, // 결제 ID
);
```

## 단계 매핑

### EVENT_STEP_TO_RESERVATION_STEP 매핑

이벤트 단계명과 추적 단계를 매핑하는 객체:

```typescript
export const EVENT_STEP_TO_RESERVATION_STEP = {
  '[공통] 일자 선택': 'select_date',
  '[공통] 시/도 선택': 'select_sido',
  '[기타] 상품 선택': 'select_product',
  '[예약] 정류장 선택': 'select_hub',
  '[기타] 복수 노선': 'select_multiple_routes',
  '[예약] 좌석 선택': 'select_trip_type',
  '[예약] 예약 정보': 'hub_info',
  '[핸디팟] 방향 선택': 'handy_party_select_trip_type',
  '[핸디팟] 주소 입력': 'handy_party_select_address',
  '[핸디팟] 지도': 'handy_party_select_map',
  '[핸디팟] 예약 확인': 'handy_party_select_reservation_info',
  '[기타] 이름 입력': 'write_name',
  '[예약] 결제 페이지': 'payment',
  '[예약] 결제 요청': 'request_payment',
  '[예약] 결제 성공': 'success_payment',
};
```

## GA4에서 확인 방법

### 1. 실시간 보고서

- GA4 > 실시간 > 이벤트에서 `enter_reservation`, `abandon_reservation`, `complete_reservation` 이벤트 확인

### 2. 맞춤 보고서 생성

```
차원: reservation_step, exit_type, event_name, trip_type
측정항목: 이벤트 수, 사용자 수
```

## 분석 활용 방안

### 1. 단계별 이탈률 분석

- 어느 단계에서 사용자가 가장 많이 이탈하는지 확인
- 일반 예약 vs 핸디팟 예약의 이탈률 비교

### 2. 이탈 원인 분석

- 이탈 방식별(page_leave vs bottom_sheet_close) 문제점 파악
- 디버그 정보를 통한 구체적인 이탈 원인 분석

### 3. 완료율 개선

- 병목 구간을 개선하여 예약 완료율 향상
- A/B 테스트를 통한 UI/UX 개선 효과 측정

### 4. 사용자 행동 분석

- 예약 소요 시간 분석
- 스크롤 깊이와 예약 의향 상관관계 분석
- 정류장 선택 패턴 분석

### 5. 비즈니스 인사이트

- 인기 정류장 및 노선 분석
- 왕복 vs 편도 예약 비율 분석
- 결제 성공률 개선 포인트 도출

## 주의사항

### 1. 데이터 정확성

- **의도적 이동 구분**: `markAsIntentionalNavigation()` 함수를 통해 정상적인 페이지 이동과 이탈 구분
- **타임아웃 설정**: 네트워크 이슈로 인한 라우팅 실패 대비 5초 타임아웃 설정

### 2. 성능 고려사항

- **스크롤 이벤트 최적화**: useScrollDepth 훅에서 throttling 적용
- **메모리 관리**: useCallback과 useRef를 활용한 불필요한 리렌더링 방지

### 3. 개인정보 보호

- **GA4 파라미터 제한**: 이벤트명은 100자로 제한하여 전송
- **사용자 식별 정보 제외**: 개인을 특정할 수 있는 정보는 수집하지 않음

### 4. 전역 상태 관리

- **Props drilling 해결**: Jotai atom을 활용한 전역 상태 관리
- **Optional chaining**: 메소드가 없을 경우 안전하게 처리
- **컴포넌트 언마운트**: useEffect cleanup을 통한 메모리 누수 방지
