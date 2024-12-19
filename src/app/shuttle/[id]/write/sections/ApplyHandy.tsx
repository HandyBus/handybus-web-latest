'use client';

import Button from '@/components/buttons/button/Button';
import HandyRequestModal from '@/components/modals/handy-request/HandyRequestModal';
import { useState } from 'react';

const ApplyHandy = () => {
  const [isHandyRequestModalOpen, setIsHandyRequestModalOpen] = useState(false);

  return (
    <>
      <section className="flex flex-col gap-12 px-16 py-32">
        <section>
          <h3 className="text-22 font-700 leading-[30.8px] text-grey-900">
            핸디 지원하기
          </h3>
          <p className="text-14 font-500 leading-[22.4px] text-grey-500">
            안전한 운행을 도와주면, 다음 이용료가 절반!
          </p>
        </section>
        <section className="flex gap-8">
          <Button variant="handyCancel" className="w-[122px]">
            안 할래요
          </Button>
          <Button
            variant="secondary"
            className="w-[136px]"
            onClick={() => setIsHandyRequestModalOpen(true)}
          >
            지원 할래요
          </Button>
        </section>
        <p className="text-12 font-500 leading-[19.2px] text-grey-700 underline">
          핸디역할 알아보기
        </p>
      </section>
      <HandyRequestModal
        isOpen={isHandyRequestModalOpen}
        onClosed={() => setIsHandyRequestModalOpen(false)}
        onConfirm={() => {}}
      />
    </>
  );
};

export default ApplyHandy;
