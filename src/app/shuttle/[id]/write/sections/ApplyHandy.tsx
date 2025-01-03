'use client';

import Button from '@/components/buttons/button/Button';
import HandyRequestModal from '@/components/modals/handy-request/HandyRequestModal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const ApplyHandy = () => {
  const [isHandyRequestModalOpen, setIsHandyRequestModalOpen] = useState(false);
  const { watch, setValue } = useFormContext();
  const isHandy = watch('isHandy');
  const router = useRouter();

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
          <Button
            variant={isHandy ? 'secondary' : 'handyCancel'}
            className="w-[122px]"
            onClick={() => {
              setValue('isHandy', false);
            }}
          >
            안 할래요
          </Button>
          <Button
            variant={isHandy ? 'handyCancel' : 'secondary'}
            className="w-[136px]"
            onClick={() => {
              setValue('isHandy', true);
            }}
          >
            지원 할래요
          </Button>
        </section>
        <section>
          <button
            className="text-12 font-500 leading-[19.2px] text-grey-700 underline"
            onClick={() => setIsHandyRequestModalOpen(true)}
          >
            핸디역할 알아보기
          </button>
        </section>
      </section>
      <HandyRequestModal
        isOpen={isHandyRequestModalOpen}
        onClosed={() => setIsHandyRequestModalOpen(false)}
        onConfirm={() => {
          router.push('/help/what-is-handy');
        }}
      />
    </>
  );
};

export default ApplyHandy;
