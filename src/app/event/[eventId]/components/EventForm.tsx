'use client';

import HubButton from './HubButton';
import DateButton from './DateButton';
import BottomBar from './BottomBar';

const EventForm = () => {
  return (
    <section className="px-16 py-24">
      <h6 className="mb-4 text-20 font-700">노선을 확인해 보세요</h6>
      <p className="mb-16 text-16 font-500 text-basic-grey-600">
        셔틀 예약 전 노선별 정류장을 확인하세요!
      </p>
      <form className="flex flex-col gap-8">
        <DateButton />
        <HubButton />
        <BottomBar />
      </form>
    </section>
  );
};

export default EventForm;
