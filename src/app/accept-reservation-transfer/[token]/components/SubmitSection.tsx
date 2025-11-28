import Button from '@/components/buttons/button/Button';
import { postAcceptReservationTransferRequest } from '@/services/reservationTransferRequest.service';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  token: string;
}

const SubmitSection = ({ token }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleAcceptReservationTransferRequest = async () => {
    setIsLoading(true);
    try {
      await postAcceptReservationTransferRequest(token);
      router.replace(
        `/accept-reservation-transfer/${token}/success?status=accepted`,
      );
    } catch (error) {
      console.error(error);
      toast.error('잠시 후 다시 시도해주세요.');
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex-1" />
      <section className="p-16">
        <Button
          type="button"
          variant="primary"
          size="large"
          onClick={handleAcceptReservationTransferRequest}
          disabled={isLoading}
        >
          탑승권 받기
        </Button>
      </section>
    </>
  );
};

export default SubmitSection;
