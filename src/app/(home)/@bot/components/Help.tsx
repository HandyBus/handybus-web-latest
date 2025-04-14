import Article from '@/components/article/Article';
import Link from 'next/link';
import ChevronRightEm from 'public/icons/chevron-right-em.svg';

const Help = () => {
  return (
    <Article richTitle="도움말">
      <div>
        {mock_help_data.map((v) => (
          <Link
            key={v.id}
            href={v.url}
            className="flex w-full items-center gap-[9px] py-12"
            target={v.target}
            rel={v.rel}
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-8 bg-basic-grey-100 text-14 font-600 leading-[90%] text-basic-grey-600">
              {v.id}
            </div>
            <p className="text-14 font-600 leading-[160%] text-basic-grey-700">
              {v.title}
            </p>
            <ChevronRightEm className="ml-auto h-24 w-24 stroke-1 text-basic-grey-400" />
          </Link>
        ))}
      </div>
    </Article>
  );
};

export default Help;

const mock_help_data = [
  {
    id: 1,
    title: '핸디버스가 처음이라면',
    url: '/help/handybus-guide',
  },
  {
    id: 2,
    title: '자주 묻는 질문',
    url: '/help/faq',
  },
  {
    id: 3,
    title: '이 행사, 셔틀 운행 해주세요',
    url: `${process.env.NEXT_PUBLIC_NEW_SHUTTLE_FORM_URL}`,
    target: '_blank',
    rel: 'noreferrer noopener',
  },
];
