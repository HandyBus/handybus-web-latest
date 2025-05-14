import { ShuttleRouteAlertRequestsViewEntity } from '@/types/alertRequest.type';
import { atom } from 'jotai';

export const userAlertRequestsAtom = atom<
  ShuttleRouteAlertRequestsViewEntity[]
>([]);

export const writeSingleUserAlertRequestAtom = atom(
  null,
  (get, set, update: ShuttleRouteAlertRequestsViewEntity) => {
    const prevUserDemands = get(userAlertRequestsAtom);
    set(userAlertRequestsAtom, [...prevUserDemands, update]);
  },
);

export const checkIsUserAlertRequestAvailable = (
  shuttleRouteId: string,
  userAlertRequests: ShuttleRouteAlertRequestsViewEntity[],
): boolean => {
  return userAlertRequests.some(
    (alertRequest) => alertRequest.shuttleRouteId === shuttleRouteId,
  );
};
