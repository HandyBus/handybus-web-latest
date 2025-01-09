import Button from '@/components/buttons/button/Button';
import { Controller, useFormContext } from 'react-hook-form';
import { ReservationFormValues } from '../../Form';
import HandyRequestModal from '@/components/modals/handy-request/HandyRequestModal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ApplyHandy = () => {
  const router = useRouter();
  const { control } = useFormContext<ReservationFormValues>();
  const [isHandyRequestModalOpen, setIsHandyRequestModalOpen] = useState(false);

  return (
    <>
      <section className="flex flex-col gap-12 py-32">
        <div>
          <h3 className="text-22 font-700 text-grey-900">핸디 지원하기</h3>
          <p className="text-14 font-400 text-grey-500">
            안전한 운행을 도와주면, 다음 이용료가 절반!
          </p>
        </div>
        <div className="flex gap-8">
          <Controller
            control={control}
            name="isSupportingHandy"
            render={({ field: { value, onChange } }) => (
              <>
                <Button
                  variant="none"
                  type="button"
                  className={`h-[42px] px-32 ${value === false ? 'bg-grey-700 text-white active:bg-grey-500' : 'bg-grey-50 text-grey-700 active:bg-grey-100'}`}
                  onClick={() => {
                    onChange(false);
                  }}
                >
                  안 할래요
                </Button>
                <Button
                  variant="none"
                  type="button"
                  className={`h-[42px] px-32 ${
                    value === true
                      ? 'bg-grey-700 text-white active:bg-grey-500'
                      : 'bg-grey-50 text-grey-700 active:bg-grey-100'
                  }`}
                  onClick={() => {
                    onChange(true);
                  }}
                >
                  지원 할래요
                </Button>
              </>
            )}
          />
        </div>
        <p>
          <button
            type="button"
            className="text-12 font-400 text-grey-700 underline"
            onClick={() => setIsHandyRequestModalOpen(true)}
          >
            핸디역할 알아보기
          </button>
        </p>
      </section>
      <HandyRequestModal
        isOpen={isHandyRequestModalOpen}
        onClosed={() => setIsHandyRequestModalOpen(false)}
        onConfirm={() => router.push('/help/what-is-handy')}
      />
    </>
  );
};

export default ApplyHandy;
