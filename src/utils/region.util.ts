import type { Region } from '@/hooks/useRegion';

export const regionToString = (region: Region) => {
  return `${region.bigRegion === undefined ? '전국' : region.bigRegion}${region.smallRegion ? ` ${region.smallRegion}` : ''}`;
};
