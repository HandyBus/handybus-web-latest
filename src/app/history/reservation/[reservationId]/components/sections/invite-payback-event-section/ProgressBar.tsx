interface ProgressBarProps {
  percentage?: number;
  nextInviteScalingDiscount?: number;
  remainingAmount?: number;
  acceptedCount?: number;
  refundAmount?: number;
}

const ProgressBar = ({
  percentage = 30,
  nextInviteScalingDiscount = 5000,
  remainingAmount = 23000,
  acceptedCount = 4,
  refundAmount = 10000,
}: ProgressBarProps) => {
  return (
    <section className="flex flex-col rounded-8 border border-basic-grey-100 p-16">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-8">
          <span className="text-16 font-600 leading-[160%]">{percentage}%</span>
          <span
            className={`text-12 font-500 leading-[160%] ${
              percentage !== 100
                ? 'text-brand-primary-400'
                : 'text-basic-grey-600'
            }`}
          >
            {percentage !== 100
              ? `다음 초대 시 +${nextInviteScalingDiscount.toLocaleString()}원`
              : '목표를 달성했어요!'}
          </span>
        </div>
        <span className="text-12 font-500 leading-[160%] text-basic-grey-400">
          {remainingAmount.toLocaleString()}원 남음
        </span>
      </div>
      <div className="h-[20px] w-full overflow-hidden rounded-[40px] bg-basic-grey-100">
        <div
          className="h-full rounded-[40px] transition-all duration-300"
          style={{
            width: `${percentage}%`,
            background: 'linear-gradient(90deg, #80FFDF 0%, #00E0A8 100%)',
          }}
        />
      </div>
      <div className="grid grid-cols-2 pt-12">
        <div className="flex flex-col">
          <span className="text-14 font-500 leading-[160%]">
            {acceptedCount}명
          </span>
          <span className="text-12 font-500 leading-[160%] text-basic-grey-600">
            초대 수락
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-14 font-500 leading-[160%]">
            {refundAmount.toLocaleString()}원
          </span>
          <span className="text-12 font-500 leading-[160%] text-basic-grey-600">
            환급 예정 금액
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProgressBar;
