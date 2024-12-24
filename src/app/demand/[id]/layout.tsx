import { createMetadataWithOG } from '@/constants/metadata';
import { getShuttle } from '@/services/shuttleOperation';
import { ReactNode } from 'react';

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const shuttle = await getShuttle(Number(params.id));
  const metadata = createMetadataWithOG(
    `${shuttle.name} 수요조사`,
    shuttle.image,
    shuttle.name,
  );
  return metadata;
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
