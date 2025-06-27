# FAQ 트래킹 (FAQ Engagement Tracking)

## 개요

GA4에서 FAQ 페이지에서의 사용자 상호작용을 추적하여 사용자들이 어떤 질문에 관심이 많은지, 어떤 순서로 FAQ를 확인하는지 분석하기 위한 추적 시스템입니다.

## FAQ 구조

### FAQ 카테고리

- `reservation` (예약하기): 수요조사, 예약, 취소 등 예약 관련 FAQ
- `boarding` (탑승하기): 차량, 좌석, 운행 등 탑승 관련 FAQ
- `etc` (그 외): 핸디 서비스 일반 정보 FAQ

### FAQ 리스트

25년 06월 25일 현재 총 **19개**의 FAQ가 제공됩니다:

- 예약하기: 11개
- 탑승하기: 6개
- 그 외: 2개

## 추적되는 이벤트

### 1. FAQ 클릭 이벤트 (`faq_click`)

사용자가 FAQ 아이템을 열거나 닫을 때 발생

**파라미터:**

- `event_category`: 'faq_engagement'
- `faq_title`: FAQ 제목 (100자로 제한)
- `faq_category`: FAQ 카테고리 (reservation/boarding/etc)
- `faq_position`: FAQ의 위치 (1부터 시작)
- `click_order`: 세션 내에서 몇 번째로 클릭한 FAQ인지 (열기 시에만 증가)
- `action_type`: 액션 타입 ('open' 또는 'close')
- `timestamp`: 클릭 시각

## 구현된 파일들

### 1. `src/utils/analytics/faqAnalytics.util.ts`

GA4 이벤트 전송 함수

### 2. `src/hooks/analytics/useFAQTracking.tsx`

FAQ 트래킹 로직을 담은 커스텀 훅

**기능:**

- 클릭 순서 관리 (`clickOrderRef`)
- FAQ 열기/닫기 추적
- 세션 내 클릭 순서 카운팅

**메서드:**

- `trackFAQItemClick()`: FAQ 아이템 클릭 추적
- `getCurrentClickOrder()`: 현재 클릭 순서 반환

### 3. `src/app/help/faq/components/FAQList.tsx`

FAQ 리스트 컴포넌트에서 트래킹 구현

**기능:**

- 카테고리별 FAQ 필터링
- FAQ 위치 계산 (1부터 시작)
- Accordion 컴포넌트의 `onToggle` 콜백을 통한 트래킹 호출

### 4. `src/app/help/faq/page.tsx`

FAQ 메인 페이지

**기능:**

- 탭 전환 기능 (예약하기/탑승하기/그 외)
- FAQ 리스트 렌더링
- 이용약관, 고객센터 링크 제공

### 5. `src/data/faq/index.tsx`

FAQ 데이터 정의

**구조:**

```typescript
interface FAQ {
  title: string;
  tag: 'reservation' | 'boarding' | 'etc';
  content: ReactNode;
}
```

## GA4에서 확인 방법

### 1. 실시간 보고서

- GA4 > 실시간 > 이벤트에서 `faq_click` 이벤트 확인

### 2. 맞춤 보고서 생성

```
차원: faq_category, faq_title, faq_position, action_type
측정항목: 이벤트 수, 사용자 수
```

### 3. 분석 가능한 지표

**인기 FAQ 분석:**

```
차원: faq_title, faq_category
측정항목: 이벤트 수 (action_type = 'open')
정렬: 이벤트 수 내림차순
```

**카테고리별 사용률:**

```
차원: faq_category
측정항목: 이벤트 수, 사용자 수
```

**FAQ 위치별 클릭률:**

```
차원: faq_position, faq_category
측정항목: 이벤트 수
```

**사용자 FAQ 탐색 패턴:**

```
차원: click_order, faq_title
측정항목: 이벤트 수
필터: action_type = 'open'
```

## 기대 효과

### 1. 콘텐츠 최적화

- **인기 FAQ 식별**: 가장 많이 클릭되는 FAQ를 파악하여 상위 노출
- **카테고리 균형**: 카테고리별 사용률을 보고 FAQ 분배 조정

### 2. UX 개선

- **FAQ 순서 최적화**: 위치별 클릭률을 분석하여 중요한 FAQ를 상단 배치
- **검색 기능 도입**: 클릭 순서 분석을 통해 사용자가 원하는 정보를 빠르게 찾을 수 있는 검색 기능 필요성 판단

### 3. 고객 지원 효율성

- **고객 문의 예측**: 자주 클릭되는 FAQ를 통해 향후 고객 문의 유형 예측
- **셀프 서비스 개선**: FAQ 사용 패턴을 분석하여 고객이 스스로 문제를 해결할 수 있도록 개선

### 4. 비즈니스 인사이트

- **사용자 니즈 파악**: FAQ 클릭 패턴을 통해 사용자들의 주요 관심사 및 우려사항 파악
- **서비스 개선점 도출**: 자주 묻는 질문을 통해 서비스의 개선이 필요한 부분 식별

## 주의사항

1. **FAQ 제목 길이 제한**: GA4 파라미터 제한으로 FAQ 제목은 100자로 제한
2. **클릭 순서 초기화**: 페이지 새로고침 시 클릭 순서가 초기화됨
3. **카테고리 변경**: 탭 전환 시에도 클릭 순서는 유지됨
