import { EventDetailProps } from '@/types/event.types';
import { instance } from '@/services/config';

export async function getOpenDemandings() {
  const res = await instance.get<{ shuttleDetails: EventDetailProps[] }>(
    '/shuttle-operation/shuttles',
  );
  const data = res.shuttleDetails;
  return data.filter((v) => v.status === 'OPEN');
}
