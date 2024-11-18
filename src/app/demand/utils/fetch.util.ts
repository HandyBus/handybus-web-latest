import { EventDetailProps } from '@/types/event.types';

export async function getOpenDemandings() {
  const url = new URL(
    '/shuttle-operation/shuttles/all',
    process.env.NEXT_PUBLIC_BASE_URL,
  );

  const response = await fetch(url);

  const shuttles = (await response.json()).shuttleDetails as EventDetailProps[];

  return shuttles.filter((v) => v.status === 'OPEN');
}

export const getStatus = async (event: EventDetailProps) => {
  const stats = event.dailyShuttles.map(async (daily) => {
    const url = new URL(
      `/shuttle-operation/shuttles/${event.id}/dates/${daily.id}/demands/stats`,
      process.env.NEXT_PUBLIC_BASE_URL,
    );

    const response = await fetch(url);

    const stats = (await response.json()).count as {
      roundTripCount: number;
      toConcertCount: number;
      fromConcertCount: number;
    };

    return stats;
  });

  return (await Promise.all(stats))
    .map((s) => s.fromConcertCount + s.roundTripCount + s.toConcertCount)
    .reduce((acc, cur) => acc + cur, 0);
};
