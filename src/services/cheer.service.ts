import {
  EventCheerCampaignsViewEntitySchema,
  ParticipationType,
} from '@/types/cheer.type';
import { authInstance, instance } from './config';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// ----- GET -----

export const getEventCheerCampaign = async (eventCheerCampaignId: string) => {
  const res = await instance.get(
    `/v1/shuttle-operation/cheeer/campaigns/${eventCheerCampaignId}`,
    {
      shape: {
        eventCheerCampaign: EventCheerCampaignsViewEntitySchema,
      },
    },
  );
  return res.eventCheerCampaign;
};

export const useGetEventCheerCampaign = (eventCheerCampaignId: string) => {
  return useQuery({
    queryKey: ['cheer', 'campaign', eventCheerCampaignId],
    queryFn: () => getEventCheerCampaign(eventCheerCampaignId),
  });
};

export const getEventCheerCampaignByEventId = async (eventId: string) => {
  const res = await instance.get(
    `/v1/shuttle-operation/events/${eventId}/cheer/campaigns`,
    {
      shape: {
        eventCheerCampaign: EventCheerCampaignsViewEntitySchema,
      },
    },
  );
  return res.eventCheerCampaign;
};

export const useGetEventCheerCampaignByEventId = (eventId: string) => {
  return useQuery({
    queryKey: ['cheer', 'campaign', 'by-event', eventId],
    queryFn: () => getEventCheerCampaignByEventId(eventId),
  });
};

// ----- POST -----

export const postEventCheerCampaignParticipation = async (
  eventCheerCampaignId: string,
  body: {
    participationType: ParticipationType;
  },
) => {
  await authInstance.post(
    `/v1/shuttle-operation/cheer/campaigns/${eventCheerCampaignId}/participants`,
    body,
  );
};

export const usePostEventCheerCampaignParticipation = (
  eventCheerCampaignId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { participationType: ParticipationType }) =>
      postEventCheerCampaignParticipation(eventCheerCampaignId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cheer', 'campaign'],
      });
      queryClient.invalidateQueries({
        queryKey: ['user', 'cheer', 'campaign', 'participations'],
      });
    },
  });
};
