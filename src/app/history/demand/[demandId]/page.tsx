'use client';

import { Stack } from '@/stacks';

interface Props {
  params: {
    demandId: string;
  };
}

const Page = ({ params }: Props) => {
  const { demandId } = params;
  return (
    <Stack
      initialContext={{
        req: {
          path: `/history/demand/${demandId}`,
        },
      }}
    />
  );
};

export default Page;
