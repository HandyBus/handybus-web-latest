import { ReactNode } from 'react';
import { createMetadataWithOG } from '@/constants/metadata';
import { getEvent } from '@/services/shuttle-operation.service';

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const event = await getEvent(Number(params.id));
  const metadata = createMetadataWithOG(
    `${event.eventName} 셔틀 예약`,
    event.eventImageUrl,
    event.eventName,
  );
  return metadata;
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
