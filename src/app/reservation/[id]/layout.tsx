import { ReactNode } from 'react';
import { createMetadataWithOG } from '@/constants/metadata';
import { getEvent } from '@/services/shuttle-operation.service';
import { DEFAULT_EVENT_IMAGE } from '@/constants/common';

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const event = await getEvent(params.id);
  const metadata = createMetadataWithOG({
    title: `${event.eventName} 셔틀 예약`,
    imageUrl: event.eventImageUrl ?? DEFAULT_EVENT_IMAGE,
    location: event.eventName,
    keywords: `${event.eventName}, ${event.eventName} 셔틀 예약, ${event.eventName} 셔틀, ${event.eventName} 버스, ${event.eventName} 차대절, ${event.eventName} 버스 대절`,
  });
  return metadata;
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
