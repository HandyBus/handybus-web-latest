import Button from '@/components/buttons/button/Button';
import { Controller, useFormContext } from 'react-hook-form';
import { ReservationFormValues } from '../../Form';
import HandyRequestModal from '@/components/modals/handy-request/HandyRequestModal';
import { useState } from 'react';
import CheckIcon from 'public/icons/check.svg';
import { useGetUser } from '@/services/user.service';

const ApplyHandy = () => {
  const { data: user } = useGetUser();
  const { control, getValues } = useFormContext<ReservationFormValues>();
  const [isHandyRequestModalOpen, setIsHandyRequestModalOpen] = useState(false);
  const isRoundTrip = getValues('type') === 'ROUND_TRIP';

  return (
    <>
      <section className="flex flex-col gap-12 py-32">
        <div>
          <h3 className="text-22 font-700 text-grey-900">핸디 지원하기</h3>
          <p className="text-14 font-400 text-grey-500">
            {isRoundTrip
              ? '핸디는 50% 셔틀비를 지원받을 수 있어요!'
              : '아쉽게도 핸디는 왕복 셔틀만 지원이 가능해요.'}
          </p>
        </div>
        <div className="flex gap-8">
          <Controller
            control={control}
            name="isSupportingHandy"
            render={({ field: { value, onChange } }) => {
              return value ? (
                <div className="flex w-full flex-col gap-12">
                  <div className="flex flex-col items-center gap-8 bg-grey-50 px-8 py-16">
                    <div className="flex items-center gap-8">
                      <CheckIcon className="w-18 h-18" />
                      <p className="text-16 font-700 leading-[160%] text-[#00C896]">
                        핸디 지원 완료!
                      </p>
                    </div>
                    <p className="text-12 font-600 leading-[160%]">
                      {`${user?.nickname ? user?.nickname + '님, ' : ''}`}
                      지원해 주셔서 감사합니다. <br />
                      확정 여부는 공연전 평균 8일 내에 알려드려요. <br />
                      핸디로 선정되면 지원금을 받으실 수 있어요.
                    </p>
                  </div>
                  <Button
                    variant="none"
                    type="button"
                    className={`h-[42px] bg-grey-50 px-32 text-16 font-600 leading-[160%] text-grey-700 active:bg-grey-100`}
                    onClick={() => {
                      onChange(false);
                    }}
                    disabled={!isRoundTrip}
                  >
                    지원 취소
                  </Button>
                </div>
              ) : (
                <Button
                  variant="none"
                  type="button"
                  className={`h-[42px] bg-[#E6FFF7] px-32 text-16 font-600 leading-[160%] text-[#00C896] active:bg-[#C1F6EB]`}
                  onClick={() => {
                    onChange(true);
                  }}
                  disabled={!isRoundTrip}
                >
                  지원하기
                </Button>
              );
            }}
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
        onConfirm={() => window.open('/help/what-is-handy', '_blank')}
      />
    </>
  );
};

export default ApplyHandy;
