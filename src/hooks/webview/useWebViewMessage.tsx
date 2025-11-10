import { AppToWebMessages, WebToAppMessages } from '@/types/webview.type';
import { getIsAppFromUserAgent } from '@/utils/environment.util';
import {
  sendMessageAndWaitForResponse,
  sendMessageToApp,
} from '@/utils/webview.util';
import { useCallback } from 'react';

/**
 * WebView 메시지 전송 및 수신을 위한 커스텀 훅
 *
 * @returns WebView 통신을 위한 유틸리티 함수들
 *
 * @example
 * const MyComponent = () => {
 *   const { sendMessage, isApp } = useWebViewMessage();
 *
 *   const handleShare = () => {
 *     if (isApp) {
 *       sendMessage('SHARE', {
 *         title: '핸디버스',
 *         url: 'https://handybus.co.kr',
 *       });
 *     } else {
 *       // 웹 환경에서의 공유 로직
 *       navigator.share({ title: '핸디버스', url: 'https://handybus.co.kr' });
 *     }
 *   };
 *
 *   return <button onClick={handleShare}>공유하기</button>;
 * };
 */
const useWebViewMessage = () => {
  const isApp = getIsAppFromUserAgent();

  /**
   * 앱으로 메시지를 전송합니다.
   */
  const sendMessage = useCallback(
    <T extends keyof WebToAppMessages>(
      type: T,
      payload: WebToAppMessages[T],
    ) => {
      return sendMessageToApp(type, payload);
    },
    [],
  );

  /**
   * 앱으로 요청을 보내고 응답을 기다립니다.
   */
  const sendRequest = useCallback(
    async <
      REQ extends keyof WebToAppMessages,
      RES extends keyof AppToWebMessages,
    >(
      requestType: REQ,
      requestPayload: WebToAppMessages[REQ],
      responseType: RES,
      timeout?: number,
    ) => {
      return sendMessageAndWaitForResponse(
        requestType,
        requestPayload,
        responseType,
        timeout,
      );
    },
    [],
  );

  return {
    /** 앱 환경 여부 */
    isApp,
    /** 앱으로 메시지 전송 */
    sendMessage,
    /** 앱으로 요청 전송 후 응답 대기 */
    sendRequest,
  };
};

export default useWebViewMessage;
