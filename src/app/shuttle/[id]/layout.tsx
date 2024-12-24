import { ReactNode } from 'react';

// TODO: 추후에 예약 페이지 메타데이터 추가
// import { createMetadataWithOG } from '@/constants/metadata';
// import { getShuttle } from '@/services/shuttleOperation';

// export const generateMetadata = async ({
//   params,
// }: {
//   params: { id: string };
// }) => {
//   const shuttle = await getShuttle(Number(params.id));
//   const metadata = createMetadataWithOG(
//     `${shuttle.name} 예약하기`,
//     shuttle.image,
//     shuttle.name,
//   );
//   return metadata;
// };

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
