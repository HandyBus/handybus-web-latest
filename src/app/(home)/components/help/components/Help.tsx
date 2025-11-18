import Article from '@/components/article/Article';
import ArrowRightIcon from 'public/icons/arrow-right.svg';
import { useFlow } from '@/stacks';
import { handleExternalLink } from '@/utils/externalLink.util';

const Help = () => {
  const flow = useFlow();
  return (
    <Article richTitle="도움말" className="px-16 pb-0 pt-32">
      <div>
        <button
          type="button"
          onClick={() => flow.push('HandybusGuide', { tab: 'SHUTTLE_BUS' })}
          className="flex w-full items-center gap-[9px] py-12 text-left"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-8 bg-basic-grey-100 text-14 font-600 leading-[90%] text-basic-grey-600">
            1
          </div>
          <p className="text-16 font-600 leading-[160%] text-basic-grey-700">
            핸디버스가 처음이라면
          </p>
          <ArrowRightIcon className="ml-auto" />
        </button>
        <button
          type="button"
          onClick={() => flow.push('Faq', {})}
          className="flex w-full items-center gap-[9px] py-12 text-left"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-8 bg-basic-grey-100 text-14 font-600 leading-[90%] text-basic-grey-600">
            2
          </div>
          <p className="text-16 font-600 leading-[160%] text-basic-grey-700">
            자주 묻는 질문
          </p>
          <ArrowRightIcon className="ml-auto" />
        </button>
        <button
          type="button"
          onClick={() =>
            handleExternalLink(
              process.env.NEXT_PUBLIC_NEW_SHUTTLE_FORM_URL ?? '',
            )
          }
          className="flex w-full items-center gap-[9px] py-12 text-left"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-8 bg-basic-grey-100 text-14 font-600 leading-[90%] text-basic-grey-600">
            3
          </div>
          <p className="text-16 font-600 leading-[160%] text-basic-grey-700">
            이 행사, 셔틀 운행 해주세요
          </p>
          <ArrowRightIcon className="ml-auto" />
        </button>
      </div>
    </Article>
  );
};

export default Help;
