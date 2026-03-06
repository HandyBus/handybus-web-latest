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
    title: `${event.eventDisplayName} 행사 상세보기 | ${TITLE}`,
    imageUrl: event.eventImageUrl ?? DEFAULT_EVENT_IMAGE,
    location: event.eventLocationName,
    url: `/event/${params.eventId}`,
    keywords: `${event.eventDisplayName}, ${event.eventDisplayName} 셔틀 수요조사, ${event.eventDisplayName} 셔틀 예약, ${event.eventDisplayName} 셔틀, ${event.eventDisplayName} 버스, ${event.eventDisplayName} 택시, ${event.eventDisplayName} 택시팟, ${event.eventDisplayName} 핸디팟, ${event.eventDisplayName} 차대절, ${event.eventDisplayName} 버스 대절, ${event.eventDisplayName} 행사 셔틀`,
  });
  return metadata;
};

const EventLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default EventLayout;
