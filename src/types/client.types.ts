export type AgeType =
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
  gender: GenderType;
  ageRange: AgeType;
  phoneNumber: string;
  profileImage: string;
  favoriteArtistsIDS: number[];
}

export interface ArtistType {
  id: number;
  name: string;
}
