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
  const metadata = createMetadataWithOG(
    `${event.eventName} 셔틀 예약`,
    event.eventImageUrl ?? DEFAULT_EVENT_IMAGE,
    event.eventName,
  );
  return metadata;
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
