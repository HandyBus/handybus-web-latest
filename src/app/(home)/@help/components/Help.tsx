import Link from 'next/link';
import TicketIcon from './icons/ticket.svg';
import ShuttleBusIcon from './icons/shuttle-bus.svg';
import ChatIcon from './icons/chat.svg';

const Help = () => {
  return (
    <section className="bg-basic-grey-50 px-16 pb-24 pt-32">
      <h2 className="pb-16 text-20 font-700 leading-[140%]">도움말</h2>
      <div className="flex flex-col gap-8">
        {HELP_CARDS.map((card) => (
          <Link
            key={card.title}
            href={card.url}
            className="flex h-[78px] items-center justify-between rounded-8 border border-[rgba(0,0,0,0.08)] bg-basic-white px-16"
          >
            <div className="flex flex-col gap-4">
              <span className="text-14 font-600 leading-[140%] text-basic-grey-700">
                {card.title}
              </span>
              <span className="text-12 font-500 leading-[140%] text-basic-grey-400">
                {card.subtitle}
              </span>
            </div>
            <span className="text-[40px] leading-none">{card.icon}</span>
          </Link>
        ))}
        <Link
          href={`${process.env.NEXT_PUBLIC_NEW_SHUTTLE_FORM_URL}`}
          target="_blank"
          rel="noreferrer noopener"
          className="flex h-[62px] items-center justify-center gap-8 rounded-8 border border-brand-primary-400 bg-brand-primary-50"
        >
          <span className="text-[20px] leading-none">📋</span>
          <span className="text-14 font-600 leading-[140%] text-brand-primary-500">
            가고 싶은 행사가 있다면, 행사 요청하기
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Help;

const HELP_CARDS = [
  {
    title: '이용 방법',
    subtitle: '예약 과정 한 눈에 살펴보기',
    icon: <TicketIcon />,
    url: '/help/handybus-guide',
  },
  {
    title: '자주 묻는 질문',
    subtitle: '궁금한 점은 여기서 확인하기',
    icon: <ChatIcon />,
    url: '/help/faq',
  },
  {
    title: '서비스 소개',
    subtitle: '핸디버스가 처음이신가요?',
    icon: <ShuttleBusIcon />,
    url: '/help/about',
  },
] as const;
