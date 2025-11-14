import type { ReactNode } from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import NavBar from '@/components/nav-bar/NavBar';
import { headers } from 'next/headers';
import { getIsAppFromUserAgentServer } from '@/utils/environment.util';

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
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || '';
  const isApp = getIsAppFromUserAgentServer(userAgent);
  return (
    <>
      {!isApp && <Header />}
      <main className="w-full grow">
        {event}
        {banner}
        {help}
        {announcement}
        {greeting}
        {modal}
      </main>
      <Footer />
      <NavBar />
    </>
  );
};

export default WithFooterLayout;
