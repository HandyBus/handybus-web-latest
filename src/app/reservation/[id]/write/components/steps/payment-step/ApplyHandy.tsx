import Button from '@/components/buttons/button/Button';
import { Controller, useFormContext } from 'react-hook-form';
import { ReservationFormValues } from '../../Form';
import HandyRequestModal from '@/components/modals/handy-request/HandyRequestModal';
import { useState } from 'react';

const ApplyHandy = () => {
  const { control, getValues } = useFormContext<ReservationFormValues>();
  const [isHandyRequestModalOpen, setIsHandyRequestModalOpen] = useState(false);
  const isRoundTrip = getValues('type') === 'ROUND_TRIP';

  return (
    <>
      <section className="flex flex-col gap-12 py-32">
        <div>
          <h3 className="text-22 font-700 text-basic-grey-700">
            핸디 지원하기
          </h3>
          <p className="text-14 font-400 text-basic-grey-500">
            {isRoundTrip
              ? '핸디는 50% 셔틀비를 지원받을 수 있어요!'
              : '아쉽게도 핸디는 왕복 셔틀만 지원이 가능해요.'}
          </p>
        </div>
        <div className="flex gap-8">
          <Controller
            control={control}
            name="isSupportingHandy"
            render={({ field: { value, onChange } }) => (
              <>
                <Button
                  variant="custom"
                  type="button"
                  className={`h-[42px] px-32 ${value === false ? 'bg-basic-grey-700 text-basic-white active:bg-basic-grey-500' : 'bg-basic-grey-50 text-basic-grey-700 active:bg-basic-grey-100'}`}
                  onClick={() => {
                    onChange(false);
                  }}
                  disabled={!isRoundTrip}
                >
                  안 할래요
                </Button>
                <Button
                  variant="custom"
                  type="button"
                  className={`h-[42px] px-32 ${
                    value === true
                      ? 'bg-basic-grey-700 text-basic-white active:bg-basic-grey-500'
                      : 'bg-basic-grey-50 text-basic-grey-700 active:bg-basic-grey-100'
                  }`}
                  onClick={() => {
                    onChange(true);
                  }}
                  disabled={!isRoundTrip}
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
            className="text-12 font-400 text-basic-grey-700 underline"
            onClick={() => setIsHandyRequestModalOpen(true)}
          >
            핸디역할 알아보기
          </button>
        </p>
      </section>
      <HandyRequestModal
        isOpen={isHandyRequestModalOpen}
        onClosed={() => setIsHandyRequestModalOpen(false)}
        onConfirm={() => window.open('/help/what-is-handy', '_blank')}
      />
    </>
  );
};

export default ApplyHandy;
