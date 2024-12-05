import { EventDetailProps } from '@/types/event.types';
import { instance } from '@/services/config';

export async function getOpenDemandings() {
  const res = await instance.get('/shuttle-operation/shuttles');
  const data: EventDetailProps[] = res.data?.shuttleDetails;
  return data.filter((v) => v.status === 'OPEN');
}
