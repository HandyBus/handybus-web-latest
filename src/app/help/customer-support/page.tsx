import Header from '@/components/header/Header';
import ChevronRightEm from 'public/icons/chevron-right-em.svg';
import Footer from '@/components/footer/Footer';
import Link from 'next/link';
import TitledSection from './components/TitledSection';

const CustomerSupport = () => {
  return (
    <>
      <main>
        <Header />
        <h1 className="px-16 pt-32 text-20 font-700 leading-[140%]">도움말</h1>
        <TitledSection title="자주 묻는 질문">
          <div>
            <h1></h1>
          </div>
        </TitledSection>
        <div className="h-8 w-full bg-basic-grey-50" />
        <TitledSection title="이용 약관">
          <Content
            title="서비스 이용 약관"
            linkType="internal"
            href="/help/customer-support/terms-of-service"
          />
          <Content
            title="개인정보 처리 방침"
            linkType="internal"
            href="/help/customer-support/privacy-policy"
          />
          <Content
            title="마케팅 활용 동의"
            linkType="internal"
            href="/help/customer-support/marketing-consent"
          />
        </TitledSection>
        <div className="h-8 w-full bg-basic-grey-50" />
        <TitledSection title="고객센터">
          <Content
            title="직접 문의하기"
            linkType="internal"
            href="/help/customer-support/direct-inquiry"
          />
          <Content
            title="의견 보내기"
            linkType="external"
            href={`${process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL}`}
          />
        </TitledSection>
      </main>
      <Footer />
    </>
  );
};

export default CustomerSupport;

interface ContentProps {
  title: string;
  linkType: 'internal' | 'external';
  href: string;
}

const Content = ({ title, linkType, href }: ContentProps) => {
  if (linkType === 'internal') {
    return (
      <Link href={href} className="flex w-full flex-row justify-between py-12">
        <p className="text-16 font-600 leading-[160%]">{title}</p>
        <ChevronRightEm className="h-24 w-24 text-basic-grey-400" />
      </Link>
    );
  }
  if (linkType === 'external') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full flex-row justify-between py-12"
      >
        <p className="text-16 font-600 leading-[160%]">{title}</p>
        <ChevronRightEm className="h-24 w-24 text-basic-grey-400" />
      </a>
    );
  }
};
