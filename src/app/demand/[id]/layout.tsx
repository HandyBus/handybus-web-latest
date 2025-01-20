import { DEFAULT_EVENT_IMAGE } from '@/constants/common';
import { createMetadataWithOG } from '@/constants/metadata';
import { getEvent } from '@/services/shuttle-operation.service';
import { ReactNode } from 'react';

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const event = await getEvent(Number(params.id));
  const metadata = createMetadataWithOG(
    `${event.eventName} 수요조사`,
    event.eventImageUrl ?? DEFAULT_EVENT_IMAGE,
    event.eventName,
  );
  return metadata;
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
