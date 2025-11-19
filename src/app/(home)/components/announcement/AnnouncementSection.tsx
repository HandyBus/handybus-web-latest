'use client';

import AnnouncementPreview from './components/AnnouncementPreview';
import { useGetAnnouncements } from '@/services/core.service';

const AnnouncementSection = () => {
  const { data: announcements } = useGetAnnouncements();
  return <AnnouncementPreview announcements={announcements || []} />;
};

export default AnnouncementSection;
