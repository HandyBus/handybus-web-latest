import WrapperWithDivider from './WrapperWithDivider';

const NoticeSection = () => {
  return (
    <WrapperWithDivider>
      <section className="p-16">
        <h3 className="pb-16 text-16 font-600">유의사항</h3>
        <ul className="list-disc pl-16 text-14 font-400 leading-[160%] text-basic-grey-600">
          <li>선물하기는 탑승일 기준 6일 전까지 가능합니다.</li>
          <li>구매하신 탑승권은 개별로 분리하여 선물할 수 없습니다.</li>
          <li>
            수령인이 24시간 내 탑승권을 수락하지 않는 경우, 보낸 탑승권은
            자동으로 반환됩니다.
          </li>
          <li>
            선물한 탑승권은 재전송 및 노선 변경이 불가하며, 탑승권이 수락된 후
            발송자는 사용이 불가합니다.
          </li>
          <li>
            선물한 탑승권은 수령인의 수락 전까지 취소가 가능하며, 수락 후에는
            반환 및 취소가 불가합니다.
          </li>
          <li>
            탑승권 전달 시, 발신자의 이름과 연락처가 수령인에게 보여집니다.
          </li>
          <li>
            선물 받은 탑승권에 대한 취소는 취소/환불 정책에 따라 수령인이 진행할
            수 있으며, 해당 금액은 발송인에게 환불됩니다.
          </li>
          <li>
            안전한 이용을 위해 탑승권의 금전 거래 및 재판매는 허용되지 않습니다.
            이를 위반해 발생한 피해에 대해서는 당사가 책임지지 않습니다.
          </li>
        </ul>
      </section>
    </WrapperWithDivider>
  );
};

export default NoticeSection;
