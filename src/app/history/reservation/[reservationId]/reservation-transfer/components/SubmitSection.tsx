import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import Button from '@/components/buttons/button/Button';
import useBottomSheet from '@/hooks/useBottomSheet';
import { postCreateReservationTransferRequest } from '@/services/reservationTransferRequest.service';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  value: string;
  reservationId: string;
}

const SubmitSection = ({ value, reservationId }: Props) => {
  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();

  const checkIsPhoneNumberComplete = (phoneNumber: string) => {
    const numbers = phoneNumber.replace(/[^0-9]/g, '');
    return numbers.length === 11;
  };

  const isPhoneNumberComplete = checkIsPhoneNumberComplete(value);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    if (!isPhoneNumberComplete) {
      return;
    }
    setIsLoading(true);
    try {
      await postCreateReservationTransferRequest(reservationId, value);
      closeBottomSheet();
      router.replace(
        `/history/reservation/${reservationId}/reservation-transfer/success`,
      );
    } catch (error) {
      console.error(error);
      toast.error('잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex-1" />
      <section className="p-16">
        <Button
          type="button"
          variant="secondary"
          size="large"
          onClick={openBottomSheet}
          disabled={!isPhoneNumberComplete}
        >
          선물하기
        </Button>
      </section>
      <BottomSheet ref={bottomSheetRef} title="이 연락처로 탑승권을 보낼까요?">
        <div ref={contentRef} className="flex flex-col gap-16">
          <div className="flex flex-col items-center justify-center gap-8 rounded-8 bg-basic-grey-50 p-16">
            <h5 className="text-18 font-600">받는 사람</h5>
            <h6 className="text-18 font-500">{value}</h6>
          </div>
          <Button
            type="button"
            variant="primary"
            size="large"
            disabled={!isPhoneNumberComplete || isLoading}
            onClick={handleSubmit}
          >
            탑승권 보내기
          </Button>
        </div>
      </BottomSheet>
    </>
  );
};

export default SubmitSection;
