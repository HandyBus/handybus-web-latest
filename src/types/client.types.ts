import { BigRegionsType } from '@/constants/regions';

//  --- 유저 관련 타입 ---
export type AgeType =
  | '연령대 미지정'
  | '10대 이하'
  | '20대'
  | '30대'
  | '40대'
  | '50대'
  | '60대'
  | '70대'
  | '80대 이상';

export type GenderType = 'MALE' | 'FEMALE';

export type ProgressType =
  | 'SERVICE_TERMS_AGREEMENT'
  | 'PERSONAL_INFO_CONSENT'
  | 'MARKETING_CONSENT'
  | 'ONBOARDING_COMPLETE'
  | 'PAYMENT_COMPLETE';

export interface UserType {
  ID: number;
  nickname: string;
  phoneNumber: string;
  gender: GenderType;
  ageRange: AgeType;
  regionID: number;
  profileImage: string;
  favoriteArtistsIDS: number[];
  progresses: {
    id: number;
    isCompleted: boolean;
    type: ProgressType;
  }[];
}

export interface ArtistType {
  id: number;
  name: string;
}

export interface UserDashboardType {
  id: number;
  nickname: string;
  profileImage: string;
  gender: GenderType;
  ageRange: AgeType;
  authChannel: AuthChannelType;
  regionID: number;
  reservations: {
    past: ReservationType[];
    current: ReservationType[];
    hasReview: ReservationWithReview[];
  };
  socialInfo: {
    uniqueId: string;
    nickname: string;
  };
  favoriteArtists: ArtistType[];
  shuttleDemands: ShuttleDemandType[];
  coupons: CouponType[];
}

// --- 셔틀 및 노선 관련 타입 ---
export type ShuttleDemandStatusType =
  | 'OPEN' // 수요조사가 아직 모집 중인 상태
  | 'CLOSED' // 수요조사 모집 종료, 셔틀 미매핑 상태
  | 'SHUTTLE_ASSIGNED' // 수요조사 모집 종료, 셔틀 매핑 상태
  | 'ENDED' // 콘서트가 끝나 셔틀 운행 종료
  | 'CANCELLED' // 무산 상태
  | 'INACTIVE';

export type ShuttleStatusType =
  | 'OPEN' // 셔틀 열린 상태
  | 'CLOSED' // 셔틀의 모든 일자에 대한 수요조사 모집 종료
  | 'ENDED' // 셔틀 종료됨
  | 'INACTIVE';

export type RouteStatusType =
  | 'OPEN' // 예약모집중
  | 'CLOSED' // 예약마감
  | 'CONFIRMED' // 배차가 완료되고 모든 정보가 확정된 상태
  | 'ENDED' // 운행종료
  | 'CANCELLED' // 무산
  | 'INACTIVE'; // 비활성

export type ReservationStatusType =
  | 'NOT_PAYMENT' // 결제 전
  | 'COMPLETE_PAYMENT' // 결제 완료
  | 'RESERVATION_CONFIRM' // 예약 확정
  | 'CANCEL'; // 예약 취소

export type CancelStatusType = 'NONE' | 'CANCEL_REQUEST' | 'CANCEL_COMPLETE';

export type HandyStatusType =
  | 'NOT_SUPPORTED'
  | 'SUPPORTED'
  | 'DECLINED'
  | 'ACCEPTED';

export type TripType = 'TO_DESTINATION' | 'FROM_DESTINATION' | 'ROUND_TRIP';

export interface ShuttleDemandType {
  id: number;
  shuttle: ShuttleType;
  type: TripType;
  status: ShuttleDemandStatusType;
  passengerCount: number;
  regionID: number;
  dailyShuttleID: number;
  createdAt: string;
}

type BaseReservationType = {
  id: number;
  shuttle: ShuttleWithRouteType;
  reservationStatus: ReservationStatusType;
  cancelStatus: CancelStatusType;
  handyStatus: HandyStatusType;
  payment: PaymentType;
  createdAt: string;
  type: TripType;
};

type ReservationWithReview = BaseReservationType & {
  hasReview: true;
  review: Omit<ReviewType, 'shuttle'>;
};

type ReservationWithoutReview = BaseReservationType & {
  hasReview: false;
};

export type ReservationType = ReservationWithReview | ReservationWithoutReview;

export interface ShuttleType {
  id: number;
  name: string;
  status: ShuttleStatusType;
  date: string;
  image: string;
  destination: DestinationType;
  route?: RouteType;
}

export type ShuttleWithRouteType = ShuttleType & { route: RouteType };

export interface RouteType {
  name: string;
  status: RouteStatusType;
  hubs: {
    pickup: HubType[];
    dropoff: HubType[];
  };
}

export interface DestinationType {
  name: string;
  longitude: number;
  latitude: number;
}

export interface ImageType {
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewType {
  id: number;
  shuttle: ShuttleType;
  rating: number;
  content: string;
  images: ImageType[];
  createdAt: string;
}

export interface CouponType {
  id: number;
  name: string;
  description: string;
}

export type AuthChannelType = 'NONE' | 'kakao' | 'naver';

export interface RegionType {
  id: number;
  provinceFullName: BigRegionsType;
  provinceShortName: string;
  cityFullName: string;
  cityShortName: string;
}

export interface HubType {
  name: string;
  sequence: number;
  arrivalTime: string;
  selected: boolean;
}

export interface PaymentType {
  id: number;
  principalAmount: number;
  paymentAmount: number;
  discountAmount: number;
}
