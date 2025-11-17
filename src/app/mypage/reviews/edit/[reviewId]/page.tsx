'use client';

import { Stack } from '@/stacks';

interface Props {
  params: {
    reviewId: string;
  };
}

const Page = ({ params }: Props) => {
  const { reviewId } = params;
  return (
    <Stack
      initialContext={{
        req: {
          path: `/mypage/reviews/edit/${reviewId}`,
        },
      }}
    />
  );
};

export default Page;
