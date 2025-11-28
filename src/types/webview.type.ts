/**
 * WebView와 웹 간 통신을 위한 타입 정의
 */

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
 * 웹에서 앱으로 보낼 수 있는 메시지 타입들
 * 새로운 메시지 타입을 추가할 때는 이 인터페이스를 확장하세요.
 */
export interface WebToAppMessages {
  /** 앱에서 외부 브라우저 열기 요청 */
  OPEN_EXTERNAL_BROWSER: {
    url: string;
  };
  /** 앱에서 공유하기 기능 요청 */
  SHARE: {
    title?: string;
    message?: string;
    url: string;
  };
  /** 앱에 특정 화면으로 네비게이션 요청 */
  NAVIGATE: {
    screen: string;
    params?: Record<string, unknown>;
  };
  /** 앱에 저장소에 데이터 저장 요청 */
  SAVE_DATA: {
    key: string;
    value: string;
  };
  /** 앱에 저장소에서 데이터 불러오기 요청 */
  LOAD_DATA: {
    key: string;
  };
  /** 앱에서 권한 요청 */
  REQUEST_PERMISSION: {
    permission: 'camera' | 'location' | 'notification';
  };
  /** 앱에서 푸시 토큰 요청 */
  REQUEST_PUSH_TOKEN: undefined;
  /** 웹뷰 콘솔 로그 전송 */
  CONSOLE_LOG: {
    level: 'log' | 'error' | 'warn' | 'info' | 'debug';
    message: string;
    args?: unknown[];
  };
}

/**
 * 앱에서 웹으로 보낼 수 있는 메시지 타입들
 */
export interface AppToWebMessages {
  /** 앱에서 웹으로 데이터 전달 */
  DATA_LOADED: {
    key: string;
    value: string | null;
  };
  /** 앱에서 웹으로 권한 요청 결과 전달 */
  PERMISSION_RESULT: {
    permission: 'camera' | 'location' | 'notification';
    granted: boolean;
  };
  /** 앱에서 웹으로 네비게이션 이벤트 전달 */
  NAVIGATION_EVENT: {
    event: 'back_pressed' | 'app_resumed' | 'app_paused';
  };
  /** 앱에서 웹으로 앱 상태 전달 */
  APP_STATE: {
    isActive: boolean;
  };
  /** 앱에서 웹으로 푸시 토큰 전달 */
  PUSH_TOKEN: {
    token: string | null;
  };
}

/**
 * 웹에서 앱으로 보내는 메시지의 공통 구조
 */
export interface WebToAppMessage<T extends keyof WebToAppMessages> {
  type: T;
  payload: WebToAppMessages[T];
  timestamp: number;
}

/**
 * 앱에서 웹으로 보내는 메시지의 공통 구조
 */
export interface AppToWebMessage<T extends keyof AppToWebMessages> {
  type: T;
  payload: AppToWebMessages[T];
  timestamp: number;
}

/**
 * 메시지 리스너 콜백 타입
 */
export type MessageListener<T extends keyof AppToWebMessages> = (
  payload: AppToWebMessages[T],
) => void;

/**
 * 메시지 리스너 제거 함수 타입
 */
export type UnsubscribeFunction = () => void;
