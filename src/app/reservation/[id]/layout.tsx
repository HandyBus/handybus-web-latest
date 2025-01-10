import { ReactNode } from 'react';
import { createMetadataWithOG } from '@/constants/metadata';
import { getShuttle } from '@/services/shuttleOperation';

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const shuttle = await getShuttle(Number(params.id));
  const metadata = createMetadataWithOG(
    `${shuttle.name} 셔틀 예약`,
    shuttle.image,
    shuttle.name,
  );
  return metadata;
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
