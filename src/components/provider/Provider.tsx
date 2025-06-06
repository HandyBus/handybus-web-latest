'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import DeadZone from '../dead-zone/DeadZone';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');
dayjs.locale('ko');

interface Props {
  children: ReactNode;
}

const Provider = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <DeadZone>{children}</DeadZone>
        <ReactQueryDevtools initialIsOpen={false} />
      </JotaiProvider>
    </QueryClientProvider>
  );
};

export default Provider;
