import Section from '../Section';
import CancellationPolicyTable from '@/components/cancellation-policy/CancellationPolicyTable';
import {
  SHUTTLE_BUS_CANCELLATION_POLICY_DATA,
  HANDY_PARTY_CANCELLATION_POLICY_DATA,
} from '@/constants/cancellation-policy';

interface CancellationPolicySectionProps {
  isHandyParty: boolean;
}

const CancellationPolicySection = ({
  isHandyParty,
}: CancellationPolicySectionProps) => {
  return (
    <Section heading="취소 정책">
      <CancellationPolicyTable
        data={
          isHandyParty
            ? HANDY_PARTY_CANCELLATION_POLICY_DATA
            : SHUTTLE_BUS_CANCELLATION_POLICY_DATA
        }
      />
    </Section>
  );
};

export default CancellationPolicySection;
