import { PaymentsViewEntity } from '@/types/payment.type';
import RegularPriceContent from './components/RegularPriceContent';
import RefundPriceContent from './components/RefundPriceContent';
import WrapperWithDivider from '../../WrapperWithDivider';
import { ReferralsViewEntity } from '@/types/referral.type';

interface Props {
  payment: PaymentsViewEntity;
  passengerCount: number;
  isReservationCanceled: boolean;
  isTransferredReservation: boolean;
  targetReferral: ReferralsViewEntity | null;
}

const PriceSection = ({
  payment,
  passengerCount,
  isReservationCanceled,
  isTransferredReservation,
  targetReferral,
}: Props) => {
  if (isTransferredReservation && !isReservationCanceled) {
    return null;
  }
  return (
    <WrapperWithDivider>
      <section className="px-16 py-24">
        <h3 className="pb-16 text-16 font-600">결제 정보</h3>
        {isReservationCanceled ? (
          <RefundPriceContent
            payment={payment}
            isTransferredReservation={isTransferredReservation}
          />
        ) : (
          <RegularPriceContent
            payment={payment}
            passengerCount={passengerCount}
            targetReferral={targetReferral}
          />
        )}
      </section>
    </WrapperWithDivider>
  );
};

export default PriceSection;
