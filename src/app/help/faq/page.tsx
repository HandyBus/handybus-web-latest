import AppBar from '@/components/app-bar/AppBar';
import Article from '@/components/article/Article';
import RedirectButton from '@/components/buttons/redirect-button/RedirectButton';
import FAQ from './components/FAQ';
import HandyLogo from './icons/faq-handy-logo.svg';
import { faqs } from '@/data/faq';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
};

const FAQPage = async () => (
  <>
    <AppBar>FAQ</AppBar>
    <Article
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
      titleSize="large"
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
    </Article>
  </>
);

export default FAQPage;

const AskHandyButton = () => (
  <RedirectButton description="찾는 답변이 없다면" href="/TODO">
    핸디버스에게 직접 물어보기
  </RedirectButton>
);
