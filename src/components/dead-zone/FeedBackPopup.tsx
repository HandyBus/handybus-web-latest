import ChatSolidIcon from 'public/icons/chat-solid.svg';

const FeedBackPopup = () => {
  return (
    <a
      className="fixed bottom-52 right-[calc(50%-500px)] z-[99] flex h-[77px] w-[210px] flex-col items-center rounded-[10px] bg-grey-50 px-16 py-20 max-[1000px]:hidden"
      target="_blank"
      rel="noopener noreferrer"
      href="https://docs.google.com/forms/d/1_PgL6I3XDhbAEae_CBMnwzaJXlTJdHswhUtriJ58fi8/edit"
    >
      <ChatSolidIcon />
      <div className="mb-8 mt-12 text-20 font-700 tracking-[-0.5px]">
        의견남기기
      </div>
      <div className="w-full"></div>
    </a>
  );
};

export default FeedBackPopup;
