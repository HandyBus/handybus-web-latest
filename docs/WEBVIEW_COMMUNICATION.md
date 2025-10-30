# WebView 통신 가이드

Next.js 웹과 React Native WebView 앱 간의 postMessage 통신을 위한 가이드입니다.

## 개요

Next.js 웹 애플리케이션과 React Native WebView 앱 간의 양방향 통신을 타입 안전하게 지원합니다.

### 주요 기능

- ✅ 타입 안전한 메시지 통신
- ✅ React 훅 기반 API
- ✅ Request-Response 패턴 지원
- ✅ 다중 리스너 지원
- ✅ 자동 환경 감지 (앱/웹)

### 아키텍처

```
┌─────────────────────┐          postMessage          ┌──────────────────────┐
│                     │ ───────────────────────────> │                      │
│   Next.js Web       │                               │  React Native App    │
│   (웹 브라우저)      │ <─────────────────────────── │  (WebView)           │
│                     │    window.postMessage         │                      │
└─────────────────────┘                               └──────────────────────┘
```

## 설치 및 설정

### 웹(Next.js) 측 설정

이미 프로젝트에 포함되어 있습니다. 별도 설치가 필요 없습니다.

**파일 구조:**

```
src/
├── types/
│   └── webview.type.ts          # 메시지 타입 정의
├── utils/
│   └── webview.util.ts          # 유틸리티 함수
└── hooks/
    └── useWebViewMessage.ts     # React 훅
```

### React Native 앱 측 설정

React Native 앱에서는 다음과 같이 WebView를 설정해야 합니다:

```tsx
// App.tsx (React Native)
import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';

const App = () => {
  const webViewRef = useRef<WebView>(null);

  const handleMessage = (event: WebViewMessageEvent) => {
    const message = JSON.parse(event.nativeEvent.data);

    switch (message.type) {
      case 'SHOW_TOAST':
        // 토스트 표시 로직
        ToastAndroid.show(message.payload.message, ToastAndroid.SHORT);
        break;
      case 'SHARE':
        // 공유하기 로직
        Share.share({
          title: message.payload.title,
          message: message.payload.message,
          url: message.payload.url,
        });
        break;
      // ... 다른 메시지 타입 처리
    }
  };

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: 'https://handybus.co.kr' }}
      onMessage={handleMessage}
      // 커스텀 User Agent 추가 (앱 환경 식별용)
      userAgent="HandybusApp/1.0.0 ..."
    />
  );
};
```

## 기본 사용법

### 1. 앱으로 메시지 전송하기

#### 방법 A: 훅 사용

```tsx
import { useWebViewMessage } from '@/hooks/useWebViewMessage';

const MyComponent = () => {
  const { sendMessage, isApp } = useWebViewMessage();

  const handleShare = () => {
    if (isApp) {
      sendMessage('SHARE', {
        title: '핸디버스',
        message: '함께 버스 타요!',
        url: 'https://handybus.co.kr',
      });
    } else {
      // 웹 환경 대체 로직
      navigator.share({
        title: '핸디버스',
        url: 'https://handybus.co.kr',
      });
    }
  };

  return <button onClick={handleShare}>공유하기</button>;
};
```

#### 방법 B: 유틸리티 함수 직접 사용

```tsx
import { sendMessageToApp } from '@/utils/webview.util';
import { getIsAppFromUserAgent } from '@/utils/environment.util';

const handleShowToast = () => {
  if (getIsAppFromUserAgent()) {
    sendMessageToApp('SHOW_TOAST', {
      message: '예약이 완료되었습니다',
      duration: 'short',
    });
  }
};
```

### 2. 앱에서 오는 메시지 수신하기

#### 단일 메시지 수신

```tsx
import { useAppMessageListener } from '@/hooks/useWebViewMessage';
import { useState } from 'react';

const MyComponent = () => {
  const [isAppActive, setIsAppActive] = useState(true);

  useAppMessageListener(
    'APP_STATE',
    (payload) => {
      setIsAppActive(payload.isActive);
    },
    [],
  );

  return <div>앱 상태: {isAppActive ? '활성' : '백그라운드'}</div>;
};
```

#### 다중 메시지 수신

```tsx
import { useMultipleAppMessageListeners } from '@/hooks/useWebViewMessage';

const MyComponent = () => {
  useMultipleAppMessageListeners(
    {
      APP_STATE: (payload) => {
        console.log('앱 상태:', payload.isActive);
      },
      PERMISSION_RESULT: (payload) => {
        console.log('권한 결과:', payload.granted);
      },
      NAVIGATION_EVENT: (payload) => {
        console.log('네비게이션 이벤트:', payload.event);
      },
    },
    [],
  );

  return <div>메시지 수신 중...</div>;
};
```

### 3. 편의 훅 사용하기

#### 토스트 표시

```tsx
import { useAppToast } from '@/hooks/useWebViewMessage';

const MyComponent = () => {
  const showToast = useAppToast();

  const handleSubmit = async () => {
    try {
      await submitForm();
      showToast('제출이 완료되었습니다', 'short');
    } catch (error) {
      showToast('제출에 실패했습니다', 'long');
    }
  };

  return <button onClick={handleSubmit}>제출</button>;
};
```

#### 공유하기

```tsx
import { useAppShare } from '@/hooks/useWebViewMessage';

const MyComponent = () => {
  const share = useAppShare();

  const handleShare = () => {
    share({
      title: '핸디버스',
      message: '함께 버스 타요!',
      url: 'https://handybus.co.kr/event/123',
    });
  };

  return <button onClick={handleShare}>공유하기</button>;
};
```

## 고급 사용법

### Request-Response 패턴

앱으로 요청을 보내고 응답을 기다리는 패턴입니다.

```tsx
import { useWebViewMessage } from '@/hooks/useWebViewMessage';
import { useState } from 'react';

const MyComponent = () => {
  const { sendRequest } = useWebViewMessage();
  const [userData, setUserData] = useState<string | null>(null);

  const loadUserToken = async () => {
    try {
      const response = await sendRequest(
        'LOAD_DATA', // 요청 타입
        { key: 'userToken' }, // 요청 페이로드
        'DATA_LOADED', // 응답 타입
        3000, // 타임아웃 (ms)
      );

      setUserData(response.value);
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    }
  };

  return (
    <div>
      <button onClick={loadUserToken}>토큰 로드</button>
      {userData && <p>토큰: {userData}</p>}
    </div>
  );
};
```

### 권한 요청 예시

```tsx
import {
  useWebViewMessage,
  useAppMessageListener,
} from '@/hooks/useWebViewMessage';
import { useState } from 'react';

const CameraComponent = () => {
  const { sendMessage } = useWebViewMessage();
  const [hasPermission, setHasPermission] = useState(false);

  // 권한 요청 결과 수신
  useAppMessageListener(
    'PERMISSION_RESULT',
    (payload) => {
      if (payload.permission === 'camera') {
        setHasPermission(payload.granted);
        if (payload.granted) {
          console.log('카메라 권한 승인됨');
        } else {
          console.log('카메라 권한 거부됨');
        }
      }
    },
    [],
  );

  const requestCameraPermission = () => {
    sendMessage('REQUEST_PERMISSION', { permission: 'camera' });
  };

  return (
    <div>
      <button onClick={requestCameraPermission}>카메라 권한 요청</button>
      {hasPermission && <p>카메라 사용 가능</p>}
    </div>
  );
};
```

## 메시지 타입 추가하기

새로운 메시지 타입을 추가하려면 `webview.type.ts` 파일을 수정합니다.

### 웹 → 앱 메시지 추가

```typescript
// src/types/webview.type.ts

export interface WebToAppMessages {
  // ... 기존 타입들

  /** 새로운 메시지: 결제 요청 */
  PAYMENT_REQUEST: {
    amount: number;
    orderId: string;
    productName: string;
  };

  /** 새로운 메시지: 위치 정보 요청 */
  REQUEST_LOCATION: Record<string, never>;
}
```

### 앱 → 웹 메시지 추가

```typescript
// src/types/webview.type.ts

export interface AppToWebMessages {
  // ... 기존 타입들

  /** 새로운 메시지: 결제 결과 */
  PAYMENT_RESULT: {
    success: boolean;
    transactionId: string;
    errorMessage?: string;
  };

  /** 새로운 메시지: 위치 정보 응답 */
  LOCATION_RESULT: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
}
```

### 새로운 타입 사용 예시

```tsx
const PaymentComponent = () => {
  const { sendMessage } = useWebViewMessage();

  useAppMessageListener(
    'PAYMENT_RESULT',
    (payload) => {
      if (payload.success) {
        console.log('결제 성공:', payload.transactionId);
      } else {
        console.error('결제 실패:', payload.errorMessage);
      }
    },
    [],
  );

  const handlePayment = () => {
    sendMessage('PAYMENT_REQUEST', {
      amount: 10000,
      orderId: 'ORDER-123',
      productName: '핸디버스 티켓',
    });
  };

  return <button onClick={handlePayment}>결제하기</button>;
};
```

## 디버깅 팁

### 1. 콘솔 로그 확인

WebView 통신 함수들은 자동으로 로그를 출력합니다:

```
[WebView] Message sent to app: SHARE { url: "https://..." }
[WebView] Message received from app: APP_STATE { isActive: true }
[WebView] Message listener removed: APP_STATE
```

### 2. 환경 확인

```tsx
import { getIsAppFromUserAgent } from '@/utils/environment.util';

console.log('앱 환경:', getIsAppFromUserAgent());
console.log('User Agent:', navigator.userAgent);
console.log(
  'ReactNativeWebView 객체:',
  typeof window !== 'undefined' ? window.ReactNativeWebView : undefined,
);
```

### 3. React Native 디버거

React Native 앱에서는 Flipper나 React Native Debugger를 사용하여
WebView 메시지를 모니터링할 수 있습니다.

## 베스트 프랙티스

### 1. 환경 분기 처리

항상 앱 환경과 웹 환경을 구분하여 처리합니다:

```tsx
const { isApp, sendMessage } = useWebViewMessage();

const handleAction = () => {
  if (isApp) {
    // 앱 환경: postMessage 사용
    sendMessage('SHARE', { url: '...' });
  } else {
    // 웹 환경: Web API 사용
    navigator.share({ url: '...' });
  }
};
```

### 2. 에러 처리

메시지 전송 실패에 대비합니다:

```tsx
const success = sendMessage('SHARE', { url: '...' });

if (!success) {
  console.error('메시지 전송 실패');
  // 대체 로직
}
```

### 3. 타임아웃 설정

Request-Response 패턴에서는 적절한 타임아웃을 설정합니다:

```tsx
try {
  const response = await sendRequest(
    'LOAD_DATA',
    { key: 'token' },
    'DATA_LOADED',
    5000, // 5초 타임아웃
  );
} catch (error) {
  // 타임아웃 또는 실패 처리
}
```

### 4. 리스너 정리

컴포넌트 언마운트 시 리스너가 자동으로 정리되지만,
조건부 리스너의 경우 명시적으로 정리할 수 있습니다:

```tsx
useEffect(() => {
  const unsubscribe = listenToAppMessage('APP_STATE', (payload) => {
    console.log(payload);
  });

  return () => unsubscribe();
}, []);
```

## 성능 고려사항

### 1. 메시지 크기

큰 데이터를 전송할 때는 JSON 직렬화 비용을 고려합니다.
가능하면 필요한 데이터만 전송합니다.

### 2. 메시지 빈도

너무 자주 메시지를 보내면 성능에 영향을 줄 수 있습니다.
필요한 경우 디바운싱이나 쓰로틀링을 사용합니다.

```tsx
import { useDebounce } from '@/hooks/useDebounce';

const MyComponent = () => {
  const { sendMessage } = useWebViewMessage();
  const debouncedSendMessage = useDebounce(sendMessage, 300);

  // ...
};
```

### 3. 리스너 수

불필요한 리스너는 제거하여 메모리를 절약합니다.
