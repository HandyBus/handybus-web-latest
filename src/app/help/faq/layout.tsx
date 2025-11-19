import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '도움말',
  description:
    '자주 묻는 질문, 서비스 이용 약관, 개인정보 처리 방침, 마케팅 활용 동의, 고객센터 등을 확인 및 이용하실 수 있어요.',
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
