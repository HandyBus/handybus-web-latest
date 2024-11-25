import type { ShuttleRoute } from '@/types/shuttle.types';
import type { Region } from '@/hooks/useRegion';

export const fetchAllShuttles = async () => {
  const url = new URL(
    '/shuttle-operation/shuttles/all/dates/all/routes',
    process.env.NEXT_PUBLIC_BASE_URL || '',
  );

  const a = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  return (await a.json()).shuttleRouteDetails as ShuttleRoute[];
};

export const fetchRelatedShuttles = async (region: Region) => {
  if (region.bigRegion === undefined) {
    return [];
  }

  const url = new URL(
    '/shuttle-operation/shuttles/all/dates/all/routes',
    process.env.NEXT_PUBLIC_BASE_URL || '',
  );

  if (region.bigRegion)
    url.searchParams.append('provinceFullName', region.bigRegion);
  if (region.smallRegion)
    url.searchParams.append('cityFullName', region.smallRegion);

  const a = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  return (await a.json()).shuttleRouteDetails as ShuttleRoute[];
};
