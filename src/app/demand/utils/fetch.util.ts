import { instance } from '@/services/config';
import { ShuttleWithDemandCountType } from '@/types/shuttle.types';

export async function getOpenDemandings() {
  const res = await instance.get<{
    shuttleDetails: ShuttleWithDemandCountType[];
  }>('/shuttle-operation/shuttles');
  const data = res.shuttleDetails;
  return data.filter((v) => v.status === 'OPEN');
}
