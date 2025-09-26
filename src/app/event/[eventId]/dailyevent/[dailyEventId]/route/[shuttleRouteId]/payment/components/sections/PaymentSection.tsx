import Divider from '../Divider';
import { PAYMENT_METHODS_ID, AGREEMENT_ID } from '@/hooks/useTossPayments';

const PaymentSection = () => {
  return (
    <>
      <Divider />
      <section className="min-h-[180px]">
        <div id={PAYMENT_METHODS_ID} />
        <div id={AGREEMENT_ID} />
      </section>
    </>
  );
};

export default PaymentSection;
