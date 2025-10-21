import type { ReactNode } from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import NavBar from '@/components/nav-bar/NavBar';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');
dayjs.locale('ko');

interface Props {
  banner: ReactNode;
  announcement: ReactNode;
  event: ReactNode;
  modal: ReactNode;
  greeting: ReactNode;
  help: ReactNode;
}

const WithFooterLayout = ({
  banner,
  announcement,
  event,
  greeting,
  help,
  modal,
}: Readonly<Props>) => {
  return (
    <div className="flex h-full flex-grow flex-col">
      <Header />
      <main className="w-full flex-grow pb-12">
        {event}
        {help}
        {banner}
        {announcement}
        {greeting}
        {modal}
      </main>
      <Footer />
      <NavBar />
    </div>
  );
};

export default WithFooterLayout;
