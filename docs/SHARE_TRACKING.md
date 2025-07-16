# 공유 추적 (Share Tracking)

## 개요

GA4에서 이벤트 공유 기능의 사용자 행동을 추적하여 공유 채널별 효과성과 사용자의 액션 상태(수요조사/예약 완료 여부)를 분석하기 위한 추적 시스템입니다.

## 공유 플로우

```
이벤트 상세페이지 접근 → 스크롤 탐색 → 공유 버튼 클릭 → 공유 채널 선택 → 공유 완료
```

## 추적되는 데이터

### 공유 채널

- `kakao`: 카카오톡 공유
- `x`: X(트위터) 공유
- `copy`: 링크 복사

### 사용자 액션 상태

- `complete_demand`: 수요조사 완료
- `complete_reservation`: 예약 완료
- `no_action`: 아무 액션도 하지 않음

### 스크롤 깊이 추적

- `current_scroll_depth`: 공유 시점의 스크롤 깊이 (0-100%)
- `max_scroll_depth`: 세션 내 최대 스크롤 깊이 (0-100%)

### 시간 경과 추적

액션(수요조사/예약) 완료 후 공유까지의 경과 시간을 커스텀 구분자 형식으로 추적:

- 형식: `{년}Y_{월}M_{일}D_{시간}H_{분}MIN`
- 예시: `2M_15D_3H_42MIN` (2개월 15일 3시간 42분 경과)

## 추적되는 이벤트

### 공유 이벤트 (`share`)

사용자가 이벤트를 공유할 때 발생

**파라미터:**

- `event_category`: 'share'
- `event_id`: 이벤트 ID
- `event_name`: 이벤트 이름
- `share_channel`: 공유 채널 (kakao/x/copy)
- `current_scroll_depth`: 공유 시점의 스크롤 깊이 (0-100)
- `max_scroll_depth`: 세션 내 최대 스크롤 깊이 (0-100)
- `user_action_status`: 사용자 액션 상태
- `user_action_timestamp`: 액션 완료 시점 (ISO 8601 형식)
- `time_since_action`: 액션 후 경과 시간 (커스텀 형식)
- `timestamp`: 공유 시각

**예시 데이터:**

```javascript
{
  event_category: 'share',
  event_id: 'event_123',
  event_name: '뉴진스 콘서트',
  share_channel: 'kakao',
  current_scroll_depth: 65,
  max_scroll_depth: 85,
  user_action_status: 'complete_demand',
  user_action_timestamp: '2024-10-02T14:18:00Z',
  time_since_action: '2M_15D_3H_42MIN',
  timestamp: '2024-12-17T18:00:00Z'
}
```

## 구현된 파일들

### 1. `src/utils/analytics/shareAnalytics.util.ts`

GA4 이벤트 전송 및 시간 계산 함수

**주요 함수:**

- `gtagShare()`: GA4 공유 이벤트 전송
- `formatTimeSinceActionCompact()`: 시간 경과를 커스텀 형식으로 변환

**타입 정의:**

- `ShareChannel`: 공유 채널 타입
- `UserActionStatus`: 사용자 액션 상태 타입
- `UserActionInfo`: 사용자 액션 정보 인터페이스

### 2. `src/hooks/analytics/useShareTracking.ts`

공유 추적 로직을 담은 커스텀 훅

**기능:**

- 사용자의 수요조사/예약 상태 조회
- 스크롤 깊이 자동 추적
- 시간 경과 계산
- GA4 이벤트 전송

**주요 함수:**

- `getUserActionInfo()`: 사용자 액션 정보 조회
- `trackShare()`: 공유 이벤트 추적 실행

### 3. `src/hooks/useScrollDepth.ts`

스크롤 깊이 추적을 위한 커스텀 훅

**기능:**

- 실시간 스크롤 깊이 계산 (0-100%)
- 최대 스크롤 깊이 추적
- 성능 최적화를 위한 throttling 적용 (100ms)

**반환값:**

- `currentScrollDepth`: 현재 스크롤 깊이
- `maxScrollDepth`: 세션 내 최대 스크롤 깊이

## 사용 방법

### 기본 사용법

```typescript
import { useShareTracking } from '@/hooks/analytics/useShareTracking';

const EventDetailPage = ({ eventId, eventName }) => {
  const { trackShare } = useShareTracking({
    eventId,
    eventName,
  });

  const handleShareClick = async (channel: 'kakao' | 'x' | 'copy') => {
    // 공유 추적 실행
    await trackShare(channel);

    // 실제 공유 로직 실행
    // ...
  };

  return (
    <div>
      <button onClick={() => handleShareClick('kakao')}>
        카카오톡 공유
      </button>
      <button onClick={() => handleShareClick('x')}>
        X 공유
      </button>
      <button onClick={() => handleShareClick('copy')}>
        링크 복사
      </button>
    </div>
  );
};
```

### 고급 사용법

## 분석 활용 방안

### 1. 공유 채널별 효과성 분석

- 사용자 액션 상태별 선호 채널 분석

### 2. 사용자 여정 분석

- 액션 완료 후 공유까지의 시간 패턴 분석
- 스크롤 깊이와 공유 의향 상관관계 분석

### 3. 콘텐츠 최적화

- 공유가 많이 발생하는 스크롤 위치 분석
- 공유 유도 요소 배치 최적화

### 4. 마케팅 전략 수립

- 액션 완료 사용자의 공유 패턴 활용
- 바이럴 마케팅 타이밍 최적화

## 주의사항

### 개인정보 보호

- 사용자 식별 가능한 정보는 수집하지 않음
- 이벤트 ID와 사용자 액션 상태만 추적

### 성능 고려사항

- 스크롤 이벤트는 100ms throttling 적용
- API 호출은 비동기 처리로 UI 블로킹 방지

### 데이터 정확성

- 네트워크 오류 시 graceful degradation
- 필수 데이터 누락 시 제외하고 부분적으로라도 추적 허용
