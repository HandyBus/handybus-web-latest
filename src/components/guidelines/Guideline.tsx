import Demand from './contents/Demand';
import CancellationAndRefund from './contents/CancellationAndRefund';
import Notice from './contents/Notice';
import type { ReactNode } from 'react';

type Guidelines = '수요조사' | '취소 및 환불 안내' | '유의사항';

const GUIDELINES: Record<Guidelines, ReactNode> = {
  수요조사: <Demand />,
  '취소 및 환불 안내': <CancellationAndRefund />,
  유의사항: <Notice />,
};

interface Props {
  type: Guidelines;
}

const Guideline = ({ type }: Props) => {
  return GUIDELINES[type];
};

export default Guideline;
