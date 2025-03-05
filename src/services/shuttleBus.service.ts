import { ShuttleBusesViewEntitySchema } from '@/types/shuttleBus.type';
import { authInstance } from './config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CustomError } from './custom-error';

export const getShuttleBus = async (
  eventId: string,
  dailyEventId: string,
  shuttleRouteId: string,
  shuttleBusId: string,
) => {
  const res = await authInstance.get(
    `/v2/shuttle-operation/events/${eventId}/dates/${dailyEventId}/routes/${shuttleRouteId}/buses/${shuttleBusId}`,
    {
      shape: {
        shuttleBus: ShuttleBusesViewEntitySchema.nullable(),
      },
    },
  );
  return res.shuttleBus;
};

export const useGetShuttleBus = (
  eventId: string,
  dailyEventId: string,
  shuttleRouteId: string,
  shuttleBusId: string,
) =>
  useQuery({
    queryKey: [
      'user',
      'shuttle-bus',
      eventId,
      dailyEventId,
      shuttleRouteId,
      shuttleBusId,
    ],
    queryFn: () =>
      getShuttleBus(eventId, dailyEventId, shuttleRouteId, shuttleBusId),
    enabled: !!eventId && !!dailyEventId && !!shuttleRouteId && !!shuttleBusId,
  });

const putShuttleBus = async (
  eventId: string,
  dailyEventId: string,
  shuttleRouteId: string,
  shuttleBusId: string,
  {
    openChatLink,
  }: {
    openChatLink: string;
  },
) => {
  return await authInstance.put(
    `/v2/shuttle-operation/events/${eventId}/dates/${dailyEventId}/routes/${shuttleRouteId}/buses/${shuttleBusId}`,
    { openChatLink },
  );
};

export const usePutShuttleBus = (
  reservationId: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: (error: CustomError) => void;
  },
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      dailyEventId,
      shuttleRouteId,
      shuttleBusId,
      openChatLink,
    }: {
      eventId: string;
      dailyEventId: string;
      shuttleRouteId: string;
      shuttleBusId: string;
      openChatLink: string;
    }) =>
      putShuttleBus(eventId, dailyEventId, shuttleRouteId, shuttleBusId, {
        openChatLink,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['user', 'reservation', reservationId],
      });
      onSuccess?.();
    },
    onError,
  });
};
