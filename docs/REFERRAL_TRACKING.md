# Referral Tracking Docs

친구 초대 페이백 이벤트와 관련된 사용자 행동을 추적하기 위한 GA(Google Analytics) 함수 및 훅에 대한 설명입니다.

## 1. Utility Functions (`src/utils/analytics/referralAnalytics.util.ts`)

| Function Name                             | Description                                                                                         | Parameters                                                        |
| :---------------------------------------- | :-------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- |
| `gtagShareReferralCode`                   | 사용자가 초대 링크를 공유(복사)했을 때 호출됩니다.                                                  | `eventName`, `eventId`, `eventDate`, `referralCode`               |
| `gtagClickShowMorePaybackTable`           | 페이백 예상 금액 테이블의 '더 보기/접기' 버튼 클릭 시 호출됩니다.                                   | `eventName`, `eventId`, `eventDate`, `action` ('open' \| 'close') |
| `gtagViewInvitePaybackEventOverviewImage` | 행사 상세 페이지에서 페이백 이벤트 배너가 화면에 노출되었을 때 호출됩니다. (1초 이상 체류 시)       | `eventName`, `eventId`                                            |
| `gtagIgnoreInvitePaybackEvent`            | 사용자가 페이백 이벤트 관련 요소(배너, 모달 등)를 보고도 상호작용 없이 이탈/종료했을 때 호출됩니다. | `source` ('banner' \| 'modal' \| 'success_page')                  |

## 2. Custom Hooks

### `useReferralTracking` (`src/hooks/analytics/useReferralTracking.ts`)

친구 초대 이벤트 추적을 위한 통합 훅입니다. 위 유틸리티 함수들을 래핑하여 컴포넌트에서 쉽게 사용할 수 있도록 제공합니다.

- **Parameters**: `{ eventId, eventName, eventDate }` (Optional)
- **Returns**:
  - `trackShareReferralCode(referralCode)`: 초대 코드 공유 추적
  - `trackClickShowMorePaybackTable(action)`: 테이블 열기/닫기 추적
  - `trackViewInvitePaybackEventBanner()`: 배너 노출 추적
  - `trackIgnoreInvitePaybackEvent(source)`: 무시(이탈) 추적

### `useIgnoreTracking` (`src/hooks/analytics/useIgnoreTracking.ts`)

요소가 화면에 노출된 후 사용자가 클릭하지 않고 지나치는(Ignore) 행동을 감지하는 범용 훅입니다.

- **Parameters**:
  - `onIgnore`: 무시했다고 판단될 때 실행할 콜백 함수 (주로 `trackIgnore...` 호출)
  - `onClick`: 요소를 클릭했을 때 실행할 함수 (클릭 시 무시 아님으로 처리)
  - `threshold`: 화면 노출 기준 비율 (기본값: 0.5)
  - `timeToConsiderViewed`: "봤다"고 간주할 최소 체류 시간 (ms, 기본값: 1000)
- **Returns**:
  - `ref`: 추적할 요소에 연결할 ref
  - `handleClick`: 요소의 `onClick` 핸들러에 연결해야 함

## 3. Usage Examples

### Case 1: 배너 무시 추적 (Banner Ignore)

```tsx
const { trackIgnoreInvitePaybackEvent } = useReferralTracking({});
const { ref, handleClick } = useIgnoreTracking({
  onIgnore: () => trackIgnoreInvitePaybackEvent('banner'),
  onClick: () => {
    /* 이동 로직 */
  },
});

return (
  <div ref={ref} onClick={handleClick}>
    <BannerImage />
  </div>
);
```

### Case 2: 모달 무시 추적 (Modal Ignore)

모달은 닫기 버튼과 같은 명시적인 종료 액션이 있으므로, `onClose` 핸들러에 직접 연결합니다.

```tsx
const { trackIgnoreInvitePaybackEvent } = useReferralTracking({});

const handleModalClose = () => {
  trackIgnoreInvitePaybackEvent('modal');
};

return (
  <Modal onClose={handleModalClose} ... />
);
```
