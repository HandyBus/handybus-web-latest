import { AppToWebMessages, MessageListener } from '@/types/webview.type';
import {
  listenToAppMessage,
  listenToMultipleMessages,
} from '@/utils/webview.util';
import { DependencyList, useEffect, useRef } from 'react';

/**
 * 앱에서 오는 메시지를 구독하는 커스텀 훅
 *
 * @param type - 수신할 메시지 타입
 * @param listener - 메시지 수신 시 실행할 콜백 함수
 * @param deps - 의존성 배열 (listener가 변경될 때 리스너를 재등록)
 *
 * @example
 * // 권한 요청 결과 수신
 * const MyComponent = () => {
 *   const { sendMessage } = useWebViewMessage();
 *
 *   useAppMessageListener('PERMISSION_RESULT', (payload) => {
 *     if (payload.granted) {
 *       console.log('권한 승인됨:', payload.permission);
 *     } else {
 *       console.log('권한 거부됨:', payload.permission);
 *     }
 *   }, []);
 *
 *   const requestCameraPermission = () => {
 *     sendMessage('REQUEST_PERMISSION', { permission: 'camera' });
 *   };
 *
 *   return <button onClick={requestCameraPermission}>카메라 권한 요청</button>;
 * };
 */
export const useAppMessageListener = <T extends keyof AppToWebMessages>(
  type: T,
  listener: MessageListener<T>,
  deps: DependencyList = [],
) => {
  const listenerRef = useRef(listener);

  // listener가 변경되면 ref 업데이트
  useEffect(() => {
    listenerRef.current = listener;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listener, ...deps]);

  useEffect(() => {
    const unsubscribe = listenToAppMessage(type, (payload) => {
      listenerRef.current(payload);
    });

    return () => {
      unsubscribe();
    };
  }, [type]);
};

/**
 * 여러 메시지 타입을 동시에 구독하는 커스텀 훅
 *
 * @param listeners - 메시지 타입과 리스너 맵
 * @param deps - 의존성 배열
 *
 * @example
 * const MyComponent = () => {
 *   const [state, setState] = useState({
 *     appActive: true,
 *     cameraGranted: false,
 *   });
 *
 *   useMultipleAppMessageListeners({
 *     APP_STATE: (payload) => {
 *       setState((prev) => ({ ...prev, appActive: payload.isActive }));
 *     },
 *     PERMISSION_RESULT: (payload) => {
 *       if (payload.permission === 'camera') {
 *         setState((prev) => ({ ...prev, cameraGranted: payload.granted }));
 *       }
 *     },
 *     NAVIGATION_EVENT: (payload) => {
 *       if (payload.event === 'back_pressed') {
 *         console.log('뒤로가기 버튼 눌림');
 *       }
 *     },
 *   }, []);
 *
 *   return <div>앱 상태: {state.appActive ? '활성' : '백그라운드'}</div>;
 * };
 */
export const useMultipleAppMessageListeners = (
  listeners: {
    [K in keyof AppToWebMessages]?: MessageListener<K>;
  },
  deps: DependencyList = [],
) => {
  const listenersRef = useRef(listeners);

  // listeners가 변경되면 ref 업데이트
  useEffect(() => {
    listenersRef.current = listeners;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listeners, ...deps]);

  useEffect(() => {
    const wrappedListeners: {
      [K in keyof AppToWebMessages]?: MessageListener<K>;
    } = {};

    // 각 리스너를 ref를 통해 호출하도록 래핑
    (
      Object.keys(listenersRef.current) as Array<keyof AppToWebMessages>
    ).forEach((messageType) => {
      wrappedListeners[messageType] = ((payload: unknown) => {
        const listener = listenersRef.current[messageType];
        if (listener) {
          (listener as MessageListener<typeof messageType>)(
            payload as AppToWebMessages[typeof messageType],
          );
        }
      }) as MessageListener<typeof messageType>;
    });

    const unsubscribe = listenToMultipleMessages(wrappedListeners);

    return () => {
      unsubscribe();
    };
  }, []);
};
