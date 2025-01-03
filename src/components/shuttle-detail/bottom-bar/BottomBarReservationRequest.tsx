import { useRouter } from 'next/navigation';
import Button from '@/components/buttons/button/Button';
import PriceInfo from './PriceInfo';
import { BottomBarType } from './BottomBar.type';
import { HTMLAttributes } from 'react';
import { ShuttleRoute } from '@/types/shuttle.types';
import { useFormContext } from 'react-hook-form';
import { finalPrice } from '@/app/shuttle/[id]/write/sections/priceDetail.util';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  type: BottomBarType;
  handleNextStep?: () => void;
  handlePrevStep?: () => void;
  disabled?: boolean;
  currentShuttleData?: ShuttleRoute;
}
const BottomBarReservationRequest = ({
  type,
  handleNextStep,
  handlePrevStep,
  disabled,
  currentShuttleData,
  ...rest
}: Props) => {
  const router = useRouter();
  const { watch } = useFormContext();
  const tripType = watch('tripType');
  const passengerCount = watch('passengerCount');
  const selectedCoupon = watch('selectedCoupon');
  if (type === 'RESERVATION_WRITE_1')
    return (
      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 bg-white shadow-[0_-4px_4px_0_rgba(0,0,0,0.15)]">
        <div className="flex flex-col gap-4 px-16 py-8">
          <div className=" flex justify-between gap-12">
            <Button
              variant="primary"
              onClick={handleNextStep}
              disabled={disabled}
            >
              셔틀 예약하기
            </Button>
          </div>
        </div>
      </div>
    );
  if (type === 'RESERVATION_WRITE_2') {
    if (!currentShuttleData) return null;
    return (
      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 bg-white shadow-[0_-4px_4px_0_rgba(0,0,0,0.15)]">
        <div className="flex flex-col gap-4 px-16 py-8">
          <PriceInfo
            currentShuttleData={currentShuttleData}
            tripType={tripType}
            passengerCount={passengerCount}
          />
          <div className="flex justify-between gap-8">
            <Button
              variant="secondary"
              className="w-76"
              onClick={handlePrevStep}
            >
              이전
            </Button>
            <Button
              variant="primary"
              onClick={handleNextStep}
              disabled={disabled}
            >
              다음단계로
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'RESERVATION_WRITE_3') {
    if (!currentShuttleData) return null;
    return (
      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 bg-white shadow-[0_-4px_4px_0_rgba(0,0,0,0.15)]">
        <div className="flex flex-col gap-4 px-16 py-8">
          <div className=" flex justify-between gap-12">
            <Button
              variant="primary"
              onClick={handleNextStep}
              disabled={disabled}
              {...rest}
            >
              {finalPrice({
                currentShuttleData,
                tripType,
                passengerCount,
                selectedCoupon,
              })}
              원 결제하기
            </Button>
          </div>
        </div>
      </div>
    );
  }
  if (type === 'RESERVATION_WRITE_4')
    return (
      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 bg-white shadow-[0_-4px_4px_0_rgba(0,0,0,0.15)]">
        <div className="flex flex-col gap-4 px-16 py-8">
          <div className="flex justify-between gap-8">
            <Button
              variant="secondary"
              className="w-76"
              onClick={() => router.push('/mypage/shuttle')}
            >
              예약 상세 보기
            </Button>
            <Button variant="primary" onClick={() => router.replace('/')}>
              홈으로
            </Button>
          </div>
        </div>
      </div>
    );
};

export default BottomBarReservationRequest;
