export const DEFAULT_EVENT_IMAGE = '/images/default-event.png';

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const DEFAULT_PAGINATION_LIMIT = 15; // 최대 20

export const DEFAULT_SSG_REVALIDATE_TIME = 3600;

export const LONG_QUERY_STALE_TIME = 5 * 60 * 1000; // 5분

export const MAX_PASSENGER_COUNT = 9; // 한번에 예약 가능한 최대 인원 수 (9명)

// 핸디팟 노선 형식: 핸디팟_${권역명}_${방향} ex) 핸디팟_중심권_행사장행
// 핸디팟 정류장 형식: 핸디팟_${권역명} ex) 핸디팟_중심권
export const HANDY_PARTY_PREFIX = '핸디팟';

export const KAKAO_CHANNEL_URL = 'https://pf.kakao.com/_AxncxhG';
