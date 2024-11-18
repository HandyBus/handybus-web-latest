import { DailyShuttleDetailProps } from './shuttle.types';

export enum EventType {
  CONCERT = 'CONCERT',
  FESTIVAL = 'FESTIVAL',
}

export interface EventDetailProps {
  /**
   * 셔틀 아이디
   * @example 1
   */
  id: number;
  /**
   * 셔틀 이름
   * @example "펜타포트 페스티벌"
   */
  name: string;
  /** 일자별 셔틀 */
  dailyShuttles: DailyShuttleDetailProps[];
  /**
   * 셔틀 이미지
   * @example "https://example.com/image.jpg"
   */
  image: string;
  /** 셔틀 상태 */
  status: 'OPEN' | 'ENDED' | 'INACTIVE';
  /** 셔틀 목적지 */
  destination: {
    /**
     * 셔틀 목적지 이름
     * @example "송도달빛축제공원"
     */
    name: string;
    /**
     * 셔틀 목적지 경도
     * @example 126.71795
     */
    longitude: number;
    /**
     * 셔틀 목적지 위도
     * @example 37.4562
     */
    latitude: number;
  };
  /** 셔틀 유형 */
  type: 'CONCERT' | 'FESTIVAL';
  /** 셔틀 참여자 */
  participants: { name: string }[];
}
