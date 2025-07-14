import Demand from './contents/Demand';
import Notice from './contents/Notice';
import type { ReactNode } from 'react';
import Inquiry from './contents/Inquiry';

type Guidelines = '수요조사' | '주요 참고사항' | '상품별 유의사항';

const GUIDELINES: Record<Guidelines, ReactNode> = {
  수요조사: <Demand />,
  '주요 참고사항': <Inquiry />,
  '상품별 유의사항': <Notice />,
};

interface Props {
  type: Guidelines;
}

const Guideline = ({ type }: Props) => {
  return GUIDELINES[type];
};

export default Guideline;
