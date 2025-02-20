import { BigRegionsType } from '@/constants/regions';
import { Artist } from '@/types/shuttle-operation.type';
import { AgeRange } from '@/types/user-management.type';

export interface OnboardingFormValues {
  nickname: string;
  phoneNumber: string;
  profileImage: File | null;
  gender: '남성' | '여성';
  age: Exclude<AgeRange, '연령대 미지정'>;
  bigRegion: BigRegionsType;
  smallRegion: string | undefined;
  regionId: string | null;
  favoriteArtists: Artist[];
}
