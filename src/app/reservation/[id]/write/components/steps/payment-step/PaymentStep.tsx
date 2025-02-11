import ReservationInfo from './ReservationInfo';
import Divider from './Divider';
import ApplyHandy from './ApplyHandy';
import ApplyCoupon from './ApplyCoupon';
import TossPayments from './TossPayments';

interface Props {
  handlePrevStep: () => void;
}

const PaymentStep = ({ handlePrevStep }: Props) => {
  return (
    <>
      <ReservationInfo />
      <Divider />
      <ApplyHandy />
      <Divider />
      <ApplyCoupon />
      <Divider />
      <section className="-mx-16">
        <TossPayments handlePrevStep={handlePrevStep} />
      </section>
    </>
  );
};

export default PaymentStep;
