import Link from 'next/link';
import LargeLogo from 'public/icons/logo-large.svg';
import ChatSolidIcon from 'public/icons/chat-solid.svg';

const DeadZonePopup = () => {
  return (
    <div className="fixed bottom-52 right-[calc(50%-500px)] z-[99] flex flex-col gap-16 max-[1000px]:hidden">
      <div className="flex h-252  w-[210px] flex-col items-center rounded-10 bg-basic-grey-50 px-16 py-20">
        <LargeLogo />
        <div className="mb-8 mt-12 text-20 font-700 tracking-[-0.5px]">
          집에서 콘서트장까지, <br />
          핸디버스의 이용 후기를 <br />
          살펴보세요.
        </div>
        <div className="w-full">
          <Link
            href="/help/reviews"
            className="text-left text-basic-grey-500 underline underline-offset-[3px]"
          >
            후기 보러 가기
          </Link>
        </div>
      </div>
      <a
        href={process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL ?? ''}
        className="flex flex-col items-start gap-4 rounded-10 bg-basic-grey-50 p-16"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex items-center gap-4">
          <ChatSolidIcon viewBox="0 0 24 24" />
          <div className="text-16 font-600 leading-[22.4px] tracking-[-0.5px] text-basic-grey-700 ">
            의견남기기
          </div>
        </div>
        <p className="text-12 font-400 leading-[16.8px] text-basic-grey-500">
          불편한 점이 있다면 알려주세요.
        </p>
      </a>
    </div>
  );
};

export default DeadZonePopup;
