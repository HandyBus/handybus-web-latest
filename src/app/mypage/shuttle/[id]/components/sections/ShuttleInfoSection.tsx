import DetailRow from '../DetailRow';
import Section from '../Section';

interface Props {
  name: string;
  busNumber: string;
  openChatLink?: string;
}

const ShuttleInfoSection = ({ name, busNumber, openChatLink }: Props) => {
  return (
    <Section title="셔틀 정보">
      <div className="flex flex-col gap-8">
        <DetailRow title="차량 종류" content={name} />
        <DetailRow title="배정 호차" content="2호차" />
        <DetailRow title="차량 번호" content={busNumber} />
        {openChatLink && (
          <DetailRow
            title="오픈채팅방 링크"
            content="https://openchat.example.com"
            isLink
          />
        )}
      </div>
    </Section>
  );
};

export default ShuttleInfoSection;
