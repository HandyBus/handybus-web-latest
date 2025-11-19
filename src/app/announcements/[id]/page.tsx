'use client';

import { Stack } from '@/stacks';

interface Props {
  params: {
    id: string;
  };
}

const Page = ({ params }: Props) => {
  const { id } = params;
  return <Stack initialContext={{ req: { path: `/announcements/${id}` } }} />;
};

export default Page;
