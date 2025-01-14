import ReservationInfo from './ReservationInfo';
import Divider from './Divider';
import ApplyHandy from './ApplyHandy';
import ApplyCoupon from './ApplyCoupon';
import TossPayments from './TossPayments';
import { Event } from '@/types/shuttle-operation.type';

interface Props {
  handlePrevStep: () => void;
  event: Event;
}

const PaymentStep = ({ handlePrevStep, event }: Props) => {
  return (
    <>
      <ReservationInfo event={event} />
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
