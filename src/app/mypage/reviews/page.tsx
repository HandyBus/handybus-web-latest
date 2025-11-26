'use client';

import { Stack } from '@/stacks';
import { ReviewTabType } from './Reviews.content';

interface Props {
  searchParams: {
    type: ReviewTabType;
  };
}

const Page = ({ searchParams }: Props) => {
  const { type } = searchParams;
  return (
    <Stack initialContext={{ req: { path: `/mypage/reviews?type=${type}` } }} />
  );
};

export default Page;
