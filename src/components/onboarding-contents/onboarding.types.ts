import { BigRegionsType } from '@/constants/regions';
import { AgeType, ArtistType } from '@/types/client.types';

export interface OnboardingFormValues {
  nickname: string;
  profileImage: File | null;
  gender: '남성' | '여성';
  age: AgeType;
  bigRegion: BigRegionsType;
  smallRegion: string;
  regionID: number;
  favoriteArtists: ArtistType[];
}
