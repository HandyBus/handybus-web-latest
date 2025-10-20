import { useSetAtom } from 'jotai';
import { eventAtom } from '../../../store/eventAtom';
import { useEffect, useRef } from 'react';
import { dailyEventIdsWithRoutesAtom } from '../../../store/dailyEventIdsWithRoutesAtom';
import { userDemandsAtom } from '../../../store/userDemandsAtom';
import { getIsLoggedIn } from '@/utils/handleToken.util';
import { getUserDemands } from '@/services/demand.service';
import { userAlertRequestsAtom } from '../../../store/userAlertRequestsAtom';
import { getUserAlertRequests } from '@/services/alertRequest.service';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { EventsViewEntity } from '@/types/event.type';

interface Props {
  event: EventsViewEntity;
  shuttleRoutes: ShuttleRoutesViewEntity[];
}

const useEventInitialization = ({ event, shuttleRoutes }: Props) => {
  const isInitialized = useRef(false);
  const setEvent = useSetAtom(eventAtom);
  const setDailyEventIdWithRoutes = useSetAtom(dailyEventIdsWithRoutesAtom);

  const setUserDemands = useSetAtom(userDemandsAtom);
  const updateUserDemands = async () => {
    const isLoggedIn = getIsLoggedIn();
    if (!isLoggedIn) {
      return;
    }
    const userDemands = await getUserDemands({
      eventId: event.eventId,
      status: 'SUBMITTED',
    });
    setUserDemands(userDemands.shuttleDemands);
  };

  const setUserAlertRequests = useSetAtom(userAlertRequestsAtom);
  const updateUserAlertRequests = async () => {
    const isLoggedIn = getIsLoggedIn();
    if (!isLoggedIn) {
      return;
    }
    const userAlertRequests = await getUserAlertRequests();
    const filteredUserAlertRequests =
      userAlertRequests.shuttleRouteAlertRequests.filter(
        (alertRequest) => alertRequest.shuttleRoute.eventId === event.eventId,
      );
    setUserAlertRequests(filteredUserAlertRequests);
  };

  useEffect(() => {
    if (isInitialized.current) {
      return;
    }
    isInitialized.current = true;
    setEvent(event);
    setDailyEventIdWithRoutes(shuttleRoutes);
    updateUserDemands();
    updateUserAlertRequests();
  }, []);

  return {
    updateUserDemands,
    updateUserAlertRequests,
  };
};

export default useEventInitialization;
