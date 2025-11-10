/**
 * 커스텀 User Agent 식별자
 *
 * React Native WebView에서 이 값을 User Agent에 추가해야 합니다.
 * 이 값을 변경하면 React Native 앱에서도 동일하게 변경해야 합니다.
 */
export const CUSTOM_USER_AGENT_IDENTIFIER = 'HandybusApp';

/**
 * 지원하는 플랫폼 목록
 */
export const SUPPORTED_PLATFORMS = ['ios', 'android', 'unknown'] as const;

export type SupportedPlatform = (typeof SUPPORTED_PLATFORMS)[number];
/**
 * User Agent 패턴
 */
export const USER_AGENT_PATTERNS = {
  iOS: /iPhone|iPad|iPod|iOS/i,
  ANDROID: /Android/i,
  MOBILE: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
} as const;
