import { EventDetailProps } from '@/types/event.types';

export async function getOpenDemandings() {
  const url = new URL(
    '/shuttle-operation/shuttles',
    process.env.NEXT_PUBLIC_BASE_URL,
  );

  const response = await fetch(url);

  const shuttles = (await response.json()).shuttleDetails as EventDetailProps[];

  return shuttles.filter((v) => v.status === 'OPEN');
}
