import { ShuttleType } from '@/types/shuttle.types';
import ReservationInfo from './ReservationInfo';
import Divider from './Divider';
import ApplyHandy from './ApplyHandy';
import ApplyCoupon from './ApplyCoupon';
import TossPayments from './TossPayments';

interface Props {
  handlePrevStep: () => void;
  shuttle: ShuttleType;
}

const PaymentStep = ({ handlePrevStep, shuttle }: Props) => {
  return (
    <>
      <ReservationInfo shuttle={shuttle} />
      <Divider />
      <ApplyHandy />
      <Divider />
      <ApplyCoupon handlePrevStep={handlePrevStep} />
      <Divider />
      <section className="-mx-16">
        <TossPayments />
      </section>
    </>
  );
};

export default PaymentStep;
