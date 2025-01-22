import type { ReactNode } from 'react';

import ServiceTerms from './service.mdx';
import PrivacyPolicy from './privacy.mdx';
import MarketingPolicy from './marketing.mdx';

export type PolicyNameType =
  | '서비스이용약관'
  | '개인정보처리방침'
  | '마케팅활용동의';

export const policies: Record<PolicyNameType, ReactNode> = {
  서비스이용약관: <ServiceTerms />,
  개인정보처리방침: <PrivacyPolicy />,
  마케팅활용동의: <MarketingPolicy />,
};
