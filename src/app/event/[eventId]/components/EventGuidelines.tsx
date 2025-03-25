'use client';

import { useEffect, useState } from 'react';
import Accordion from '@/components/accordion/Accordion';
import Guideline from '@/components/guidelines/Guideline';

const EventGuidelines = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 0);
  }, []);

  return (
    <Accordion
      title="꼭 알아두세요"
      containerClassName="bg-basic-grey-50"
      open={open}
    >
      <section className="py-16">
        <h6 className="mb-8 text-18 font-600">수요조사</h6>
        <Guideline type="수요조사" />
      </section>
      <section className="py-16">
        <h6 className="mb-8 text-18 font-600">취소 및 환불 안내</h6>
        <Guideline type="취소 및 환불 안내" />
      </section>
      <section className="py-16">
        <h6 className="mb-8 text-18 font-600">유의사항</h6>
        <Guideline type="유의사항" />
      </section>
    </Accordion>
  );
};

export default EventGuidelines;
