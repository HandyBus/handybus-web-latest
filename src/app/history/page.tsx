'use client';

import { Stack } from '@/stacks';
import { HistoryTabType } from './History.content';

interface Props {
  searchParams: {
    type: HistoryTabType;
  };
}

const Page = ({ searchParams }: Props) => {
  const { type } = searchParams;
  return <Stack initialContext={{ req: { path: `/history?type=${type}` } }} />;
};

export default Page;
