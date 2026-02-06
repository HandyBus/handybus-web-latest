import { DEFAULT_EVENT_IMAGE } from '@/constants/common';
import { createMetadataWithOG, TITLE } from '@/constants/metadata';
import { getEvent } from '@/services/event.service';
import { ReactNode } from 'react';

export const generateMetadata = async ({
  params,
}: {
  params: { eventId: string };
}) => {
  const event = await getEvent(params.eventId);
  const metadata = createMetadataWithOG({
    title: `${event.eventName} 행사 상세보기 | ${TITLE}`,
    imageUrl: event.eventImageUrl ?? DEFAULT_EVENT_IMAGE,
    location: event.eventLocationName,
    url: `/event/${params.eventId}`,
    keywords: `${event.eventName}, ${event.eventName} 셔틀 수요조사, ${event.eventName} 셔틀 예약, ${event.eventName} 셔틀, ${event.eventName} 버스, ${event.eventName} 택시, ${event.eventName} 택시팟, ${event.eventName} 핸디팟, ${event.eventName} 차대절, ${event.eventName} 버스 대절, ${event.eventName} 행사 셔틀`,
  });
  return metadata;
};

const EventLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default EventLayout;
