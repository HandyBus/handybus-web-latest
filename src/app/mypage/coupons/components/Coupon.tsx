interface Props {
  amount: string;
  title: string;
  description?: string;
  expireDate: string;
  unusable?: string;
}

const Coupon = ({
  amount,
  title,
  description,
  expireDate,
  unusable,
}: Props) => {
  return (
    <div
      className={`rounded-[12px] bg-grey-50 p-16 ${unusable ? 'opacity-50' : ''}`}
    >
      {unusable && (
        <p className="pb-4 text-12 font-600 text-red-500">{unusable}</p>
      )}
      <h4 className="text-22 font-600">{amount} 할인</h4>
      <p className="line-clamp-1 pb-4 pt-[2px] text-16 font-500 text-grey-800">
        {title}
      </p>
      {description && (
        <p className="line-clamp-1 text-12 font-400 text-grey-500">
          {description}
        </p>
      )}
      <p className="text-12 font-400 text-grey-500">
        {expireDate}까지 사용 가능
      </p>
    </div>
  );
};

export default Coupon;
