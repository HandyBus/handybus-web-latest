import { EventCheerCampaignsViewEntitySchema } from '@/types/cheer.type';
import { instance } from './config';
import { useQuery } from '@tanstack/react-query';

// ----- GET -----

export const getEventCheerCampaign = async (eventCheerCampaignId: string) => {
  const res = await instance.get(
    `/v2/shuttle-operation/event-cheer-campaigns/${eventCheerCampaignId}`,
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
    queryKey: ['eventCheerCampaign', eventCheerCampaignId],
    queryFn: () => getEventCheerCampaign(eventCheerCampaignId),
  });
};

export const getEventCheerCampaignByEventId = async (eventId: string) => {
  const res = await instance.get(
    `/v2/shuttle-operation/events/${eventId}/event-cheer-campaigns`,
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
    queryKey: ['eventCheerCampaignByEventId', eventId],
    queryFn: () => getEventCheerCampaignByEventId(eventId),
  });
};
