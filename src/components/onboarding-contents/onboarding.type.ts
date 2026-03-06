import { BigRegionsType } from '@/constants/regions';
import { UserFavoriteArtistsInUsersViewEntity } from '@/types/artist.type';
import { AgeRange } from '@/types/user.type';

export interface OnboardingFormValues {
  nickname: string;
  name: string;
  phoneNumber: string;
  profileImage: File | null;
  gender: '남성' | '여성';
  age: Exclude<AgeRange, '연령대 미지정'>;
  bigRegion: BigRegionsType;
  smallRegion: string | undefined;
  regionId: string | null;
  favoriteArtists: UserFavoriteArtistsInUsersViewEntity[];
  isAgreedMarketing: boolean;
  isAgreedServiceTerms: boolean;
  isAgreedPersonalInfo: boolean;
}
