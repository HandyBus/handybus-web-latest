import { BigRegionsType } from '@/constants/regions';

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

export interface RouteType {
  name: string;
  hubs: {
    pickup: HubType[];
    dropoff: HubType[];
    destination: HubType;
  };
}

export interface PaymentType {
  id: number;
  principalAmount: number;
  paymentAmount: number;
  discountAmount: number;
}

export type ReservationStatusType =
  | 'NOT_PAYMENT'
  | 'COMPLETE_PAYMENT'
  | 'RESERVATION_CONFIRM'
  | 'CANCEL';
export type CancelStatusType = 'NONE' | 'CANCEL_REQUEST' | 'CANCEL_COMPLETE';
export type HandyStatusType =
  | 'NOT_SUPPORTED'
  | 'SUPPORTED'
  | 'DECLINED'
  | 'ACCEPTED';

type BaseReservationType = {
  id: number;
  shuttle: ShuttleType;
  reservationStatus: ReservationStatusType;
  cancelStatus: CancelStatusType;
  handyStatus: HandyStatusType;
  payment: PaymentType;
};

type ReservationWithReview = BaseReservationType & {
  hasReview: true;
  review: ReviewType;
};

type ReservationWithoutReview = BaseReservationType & {
  hasReview: false;
};

export type ReservationType = ReservationWithReview | ReservationWithoutReview;

export interface DestinationType {
  name: string;
  longitude: number;
  latitude: number;
}

export interface ShuttleType {
  id: number;
  name: string;
  date: string;
  image: string;
  destination: DestinationType;
  route: RouteType;
}

export interface ReviewType {
  id: number;
  shuttle: ShuttleType;
  rating: number;
  content: string;
  images: string[];
  createdAt: string;
}

export type ShuttleDemandStatusType =
  | 'OPEN'
  | 'CLOSED'
  | 'SHUTTLE_ASSIGNED'
  | 'ENDED'
  | 'CANCELLED'
  | 'INACTIVE';

export interface ShuttleDemandType {
  id: number;
  shuttle: ShuttleType;
  type: 'TO_DESTINATION' | 'FROM_DESTINATION' | 'ROUND_TRIP';
  status: ShuttleDemandStatusType;
  passengerCount: number;
  region: RegionType;
}

export interface CouponType {
  id: number;
  name: string;
  description: string;
}

export type AuthChannelType = 'NONE' | 'kakao' | 'naver';

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
