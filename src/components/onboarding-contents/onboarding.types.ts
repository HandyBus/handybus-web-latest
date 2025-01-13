import { BigRegionsType } from '@/constants/regions';
import { Artist } from '@/types/v2-temp/shuttle-operation.type';
import { AgeRange } from '@/types/v2-temp/user-management.type';

export interface OnboardingFormValues {
  nickname: string;
  phoneNumber: string;
  profileImage: File | null;
  gender: '남성' | '여성';
  age: AgeRange;
  bigRegion: BigRegionsType;
  smallRegion: string | undefined;
  regionId: number;
  favoriteArtists: Artist[];
}
