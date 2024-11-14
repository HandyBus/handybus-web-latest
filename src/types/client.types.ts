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

export interface UserType {
  ID: number;
  nickname: string;
  phoneNumber: string;
  gender: GenderType;
  ageRange: AgeType;
  regionID: number;
  profileImage: string;
  favoriteArtistsIDS: number[];
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

export interface ReservationType {
  id: number;
  shuttle: ShuttleType;
  hasReview: boolean;
  reservationStatus: ReservationStatusType;
  cancelStatus: CancelStatusType;
  handyStatus: HandyStatusType;
  payment: PaymentType;
}

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
  region: RegionType;
  reservations: {
    past: ReservationType[];
    current: ReservationType[];
  };
  socialInfo: {
    uniqueId: string;
    nickname: string;
  };
  reviews: ReviewType[];
  favoriteArtists: ArtistType[];
  shuttleDemands: ShuttleDemandType[];
  coupons: CouponType[];
}
