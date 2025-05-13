import Button from '@/components/buttons/button/Button';

interface Props {
  date: string;
  time: string;
  name: string;
}

const HubItem = ({ date, time, name }: Props) => {
  return (
    <li className="flex h-36 w-full items-center gap-16">
      <div className="w-80 shrink-0">
        <p className="text-10 font-400 text-basic-grey-700">{date}</p>
        <p className="text-12 font-600">{time}</p>
      </div>
      <div className="h-16 w-[1px] bg-basic-grey-100" />
      <div className="text-16 font-600">{name}</div>
      <Button type="button" variant="tertiary" size="small" className="ml-auto">
        지도
      </Button>
    </li>
  );
};

export default HubItem;
