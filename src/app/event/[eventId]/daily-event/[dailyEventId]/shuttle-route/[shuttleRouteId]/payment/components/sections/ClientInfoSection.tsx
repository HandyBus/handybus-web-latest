import Section from '../Section';

const ClientInfoSection = () => {
  return (
    <Section heading="예약자 정보">
      <ul className="flex flex-col gap-8">
        <li className="flex gap-16">
          <p className="w-[71px] shrink-0 text-14 font-600 leading-[160%]">
            예약자명
          </p>
          <span className="text-14 font-600 leading-[160%]">수줍은찹쌀떡</span>
        </li>
        <li className="flex gap-16">
          <p className="w-[71px] shrink-0 text-14 font-600 leading-[160%]">
            연락처
          </p>
          <span className="text-14 font-600 leading-[160%]">01012345678</span>
        </li>
      </ul>
    </Section>
  );
};

export default ClientInfoSection;
