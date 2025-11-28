'use client';

import Link from 'next/link';
import Button from '@/components/buttons/button/Button';
import ReviewCompleteIcon from './icons/review-complete.svg';
import { useSearchParams } from 'next/navigation';

const SURVEY_URL = process.env.NEXT_PUBLIC_SURVEY_URL;

const CompletePage = () => {
  const searchParams = useSearchParams();
  const reviewId = searchParams.get('review-id');

  return (
    <main className="relative grow">
      <section className="absolute left-1/2 top-180 flex -translate-x-1/2 flex-col items-center whitespace-nowrap break-keep">
        <h1 className="pb-4 text-22 font-700 leading-[140%]">
          소중한 후기가 등록되었어요
        </h1>
        <p className="pb-24 text-center text-16 font-500 leading-[160%] text-basic-grey-600">
          설문조사를 통해 더 자세한 경험담을 들려주세요. <br />
          여러분의 목소리가 더 나은 핸디버스를 만들어요.
        </p>
        <ReviewCompleteIcon />
      </section>
      <div className="fixed bottom-0 left-0 right-0 mx-auto flex max-w-500 flex-col gap-8 p-16">
        <Link href={`/mypage/reviews/${reviewId}`}>
          <Button variant="primary">완료</Button>
        </Link>
        {SURVEY_URL && (
          <Button
            variant="secondary"
            size="large"
            onClick={() => {
              window.open(SURVEY_URL, '_blank', 'noopener,noreferrer');
            }}
          >
            이어서 설문조사 참여하기
          </Button>
        )}
      </div>
    </main>
  );
};

export default CompletePage;
