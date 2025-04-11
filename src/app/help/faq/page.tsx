import ArticleV1 from '@/components/article/ArticleV1';
import RedirectButton from '@/components/buttons/redirect-button/RedirectButton';
import FAQ from './components/FAQ';
import HandyLogo from './icons/faq-handy-logo.svg';
import { faqs } from '@/data/faq/index';
import { Metadata } from 'next';
import Header from '@/components/header/Header';

export const metadata: Metadata = {
  title: 'FAQ',
};

const FAQPage = async () => (
  <>
    <Header />
    <ArticleV1
      richTitle={
        <div className="flex flex-col gap-12">
          <HandyLogo />
          <p>
            자주 궁금해하시는 것들을
            <br />
            모아봤어요
          </p>
        </div>
      }
      titleClassName="text-28"
      className="mb-28 flex flex-col gap-24"
    >
      <div>
        {faqs.flatMap((faq) => (
          <FAQ key={faq.title} title={faq.title}>
            {faq.content}
          </FAQ>
        ))}
      </div>
      <div className="mt-24 px-16">
        <AskHandyButton />
      </div>
    </ArticleV1>
  </>
);

export default FAQPage;

const AskHandyButton = () => (
  <RedirectButton
    description="찾는 답변이 없다면"
    href="http://pf.kakao.com/_AxncxhG"
    target="_blank"
  >
    핸디버스에게 직접 물어보기
  </RedirectButton>
);
