import Link from 'next/link';
import Section from '../Section';

interface Props {
  id: string;
  name: string;
}

const HandySection = ({ id, name }: Props) => {
  return (
    <Section title="당신은 핸디입니다">
      <p className="pt-4 text-12 font-400 text-grey-500">
        {name} 님은 이번 셔틀의 핸디로 선정되셨습니다.
      </p>
      <Link
        href={`/mypage/shuttle/${id}/handy`}
        className="ml-auto mt-8 block w-fit rounded-full bg-grey-100 px-16 text-14 font-400 text-grey-600-sub"
      >
        오픈채팅방 링크 제출하기
      </Link>
    </Section>
  );
};

export default HandySection;
