'use client';

import Header from '@/components/header/Header';
import {
  getReadNoticeList,
  READ_NOTICE_LIST_KEY,
} from '../components/AnnouncementList';
import { useEffect } from 'react';
import { useGetAnnouncement } from '@/services/core.service';
import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';

interface Props {
  params: {
    id: string;
  };
}

const Page = ({ params }: Props) => {
  const { data: announcement } = useGetAnnouncement(params.id);

  useEffect(() => {
    addReadNotice(params.id);
  }, []);

  return (
    <main>
      <Header />
      <section className="px-16">
        <section className={`flex justify-between gap-[9px] py-12`}>
          <div className="flex flex-col">
            <span
              className={`text-14 font-600 leading-[160%] text-basic-black`}
            >
              {announcement?.title}
            </span>
            <span className="text-12 font-500 leading-[160%] text-basic-grey-500">
              {dayjs(announcement?.createdAt).format('YYYY.MM.DD HH:mm')}
            </span>
          </div>
        </section>
        <div className="mx-[-16px] h-[1px] bg-basic-grey-100" />
        <div className="prose py-16 text-16 font-500 leading-[160%] text-basic-black">
          <ReactMarkdown>{announcement?.content}</ReactMarkdown>
        </div>
      </section>
    </main>
  );
};

export default Page;

const addReadNotice = (id: string) => {
  const list = getReadNoticeList();
  if (!list.includes(id)) {
    localStorage.setItem(READ_NOTICE_LIST_KEY, JSON.stringify([...list, id]));
  }
};
