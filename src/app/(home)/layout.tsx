import type { ReactNode } from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

interface Props {
  top: ReactNode;
  bot: ReactNode;
  event: ReactNode;
  modal: ReactNode;
  greeting: ReactNode;
  help: ReactNode;
}

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');
dayjs.locale('ko');

export default function WithFooterLayout({
  top,
  bot,
  event,
  modal,
  greeting,
  help,
}: Readonly<Props>) {
  return (
    <div className="flex h-full flex-grow flex-col">
      <Header />
      <main className="w-full flex-grow pb-12">
        {top}
        {event}
        {help}
        {bot}
        {modal}
        {greeting}
      </main>
      <Footer />
    </div>
  );
}
