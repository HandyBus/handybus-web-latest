interface Props {
  text: string;
  setText: (text: string) => void;
  errorMessage?: string;
}

const ReviewTextarea = ({ text, setText, errorMessage }: Props) => {
  return (
    <div className="flex flex-col gap-16">
      <div>
        <h2 className="text-18 font-600 leading-[160%]">후기를 작성해주세요</h2>
        {!errorMessage && (
          <p className="text-14 font-500 leading-[160%] text-basic-grey-600">
            최소 20자 이상 작성해 주세요.
          </p>
        )}
        {errorMessage && (
          <p className="text-14 font-400 leading-[160%] text-basic-red-400">
            {errorMessage}
          </p>
        )}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="핸디버스 이용 경험에 대해 자유롭게 알려주세요. (최대 300자)"
        className="h-160 w-full resize-none rounded-12 border border-basic-grey-100 p-12 text-16 font-400 outline-none placeholder:text-basic-grey-300 focus:border-brand-primary-200"
      />
    </div>
  );
};

export default ReviewTextarea;
