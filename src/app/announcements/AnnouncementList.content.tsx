'use client';

import Header from '@/components/header/Header';
import AnnouncementList from './components/AnnouncementList';

const AnnouncementListContent = () => (
  <>
    <Header />
    <main className="grow-0">
      <AnnouncementList />
    </main>
  </>
);

export default AnnouncementListContent;
