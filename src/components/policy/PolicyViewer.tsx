import { PolicyNameType, policies } from '@/data/policy';
interface Props {
  type: PolicyNameType;
}

const PolicyViewer = ({ type }: Props) => {
  return policies[type];
};

export default PolicyViewer;

// NOTE: deprecated 될 예정
