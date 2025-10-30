/**
 * WebView 통신 유틸리티
 *
 * React Native WebView와 Next.js 웹 간의 postMessage 통신을 관리합니다.
 */

import type {
  AppToWebMessage,
  AppToWebMessages,
  MessageListener,
  UnsubscribeFunction,
  WebToAppMessage,
  WebToAppMessages,
} from '@/types/webview.type';
import { getIsAppFromUserAgent } from './environment.util';

/**
 * React Native WebView의 postMessage API 타입 확장
 */
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

/**
 * 웹에서 React Native 앱으로 메시지를 전송합니다.
 *
 * @param type - 메시지 타입
 * @param payload - 메시지 페이로드
 * @returns 메시지 전송 성공 여부
 *
 * @example
 * // 외부 브라우저 열기
 * sendMessageToApp('OPEN_EXTERNAL_BROWSER', {
 *   url: 'https://example.com',
 * });
 */
export const sendMessageToApp = <T extends keyof WebToAppMessages>(
  type: T,
  payload: WebToAppMessages[T],
): boolean => {
  // 앱 환경이 아닌 경우 (User Agent 기반)
  if (!getIsAppFromUserAgent()) {
    console.warn(
      '[WebView] sendMessageToApp: Not in React Native WebView environment',
    );
    return false;
  }

  // window가 없거나 ReactNativeWebView 객체가 없는 경우
  if (typeof window === 'undefined' || !window.ReactNativeWebView) {
    console.warn(
      '[WebView] sendMessageToApp: ReactNativeWebView object not found',
    );
    return false;
  }

  try {
    const message: WebToAppMessage<T> = {
      type,
      payload,
      // NOTE: 단순 타입스탬프이기에 dayjs 사용하지 않음
      timestamp: Date.now(),
    };

    const messageString = JSON.stringify(message);
    window.ReactNativeWebView.postMessage(messageString);

    console.log('[WebView] Message sent to app:', type, payload);
    return true;
  } catch (error) {
    console.error('[WebView] Failed to send message to app:', error);
    return false;
  }
};

/**
 * React Native 앱에서 웹으로 오는 메시지를 수신하는 리스너를 등록합니다.
 *
 * @param type - 수신할 메시지 타입
 * @param listener - 메시지 수신 시 실행할 콜백 함수
 * @returns 리스너 제거 함수
 *
 * @example
 * // 권한 요청 결과 수신
 * const unsubscribe = listenToAppMessage('PERMISSION_RESULT', (payload) => {
 *   console.log('Permission granted:', payload.granted);
 *   if (payload.granted) {
 *     // 권한이 승인된 경우 로직
 *   }
 * });
 *
 * // 컴포넌트 언마운트 시 리스너 제거
 * return () => unsubscribe();
 */
export const listenToAppMessage = <T extends keyof AppToWebMessages>(
  type: T,
  listener: MessageListener<T>,
): UnsubscribeFunction => {
  // 브라우저 환경이 아닌 경우
  if (typeof window === 'undefined') {
    console.warn('[WebView] listenToAppMessage: window is undefined');
    return () => {};
  }

  const messageHandler = (event: MessageEvent) => {
    try {
      const message = JSON.parse(event.data) as AppToWebMessage<
        keyof AppToWebMessages
      >;

      // 메시지 타입이 일치하는 경우에만 리스너 실행
      if (message.type === type) {
        console.log(
          '[WebView] Message received from app:',
          type,
          message.payload,
        );
        listener(message.payload as AppToWebMessages[T]);
      }
    } catch (error) {
      // JSON 파싱 실패 시 무시 (다른 형태의 메시지일 수 있음)
      console.debug('[WebView] Failed to parse message:', error);
    }
  };

  window.addEventListener('message', messageHandler);

  // iOS를 위한 이벤트 리스너도 등록
  // iOS WebView는 'message' 대신 document에서 이벤트를 받을 수 있음
  if (typeof document !== 'undefined') {
    document.addEventListener('message', messageHandler as EventListener);
  }

  // 리스너 제거 함수 반환
  return () => {
    window.removeEventListener('message', messageHandler);
    if (typeof document !== 'undefined') {
      document.removeEventListener('message', messageHandler as EventListener);
    }
    console.log('[WebView] Message listener removed:', type);
  };
};

/**
 * 여러 메시지 타입에 대한 리스너를 한 번에 등록합니다.
 *
 * @param listeners - 메시지 타입과 리스너 맵
 * @returns 모든 리스너를 제거하는 함수
 *
 * @example
 * const unsubscribe = listenToMultipleMessages({
 *   PERMISSION_RESULT: (payload) => {
 *     console.log('Permission:', payload.granted);
 *   },
 *   APP_STATE: (payload) => {
 *     console.log('App state:', payload.isActive);
 *   },
 *   NAVIGATION_EVENT: (payload) => {
 *     console.log('Navigation:', payload.event);
 *   },
 * });
 *
 * // 컴포넌트 언마운트 시 모든 리스너 제거
 * return () => unsubscribe();
 */
export const listenToMultipleMessages = (listeners: {
  [K in keyof AppToWebMessages]?: MessageListener<K>;
}): UnsubscribeFunction => {
  const unsubscribeFunctions: UnsubscribeFunction[] = [];

  // 각 리스너를 등록하고 제거 함수를 수집
  Object.entries(listeners).forEach(([type, listener]) => {
    if (listener) {
      const unsubscribe = listenToAppMessage(
        type as keyof AppToWebMessages,
        listener as MessageListener<keyof AppToWebMessages>,
      );
      unsubscribeFunctions.push(unsubscribe);
    }
  });

  // 모든 리스너를 제거하는 함수 반환
  return () => {
    unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
  };
};

/**
 * 웹에서 앱으로 요청을 보내고 응답을 기다립니다.
 * (Request-Response 패턴)
 *
 * @param requestType - 요청 메시지 타입
 * @param requestPayload - 요청 페이로드
 * @param responseType - 응답 메시지 타입
 * @param timeout - 타임아웃 시간 (ms, 기본값: 5000)
 * @returns 응답 페이로드를 반환하는 Promise
 *
 * @example
 * // 데이터 로드 요청 후 응답 대기
 * try {
 *   const response = await sendMessageAndWaitForResponse(
 *     'LOAD_DATA',
 *     { key: 'userToken' },
 *     'DATA_LOADED',
 *     3000
 *   );
 *   console.log('Loaded data:', response.value);
 * } catch (error) {
 *   console.error('Failed to load data:', error);
 * }
 */
export const sendMessageAndWaitForResponse = <
  REQ extends keyof WebToAppMessages,
  RES extends keyof AppToWebMessages,
>(
  requestType: REQ,
  requestPayload: WebToAppMessages[REQ],
  responseType: RES,
  timeout = 5000,
): Promise<AppToWebMessages[RES]> => {
  return new Promise((resolve, reject) => {
    let unsubscribe: UnsubscribeFunction | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    // 타임아웃 설정
    timeoutId = setTimeout(() => {
      if (unsubscribe) {
        unsubscribe();
      }
      reject(
        new Error(
          `[WebView] Timeout waiting for response: ${String(responseType)}`,
        ),
      );
    }, timeout);

    // 응답 리스너 등록
    unsubscribe = listenToAppMessage(responseType, (payload) => {
      // 응답을 받으면 타임아웃 해제 및 리스너 제거
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (unsubscribe) {
        unsubscribe();
      }
      resolve(payload);
    });

    // 요청 메시지 전송
    const success = sendMessageToApp(requestType, requestPayload);

    if (!success) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (unsubscribe) {
        unsubscribe();
      }
      reject(new Error('[WebView] Failed to send message to app'));
    }
  });
};
