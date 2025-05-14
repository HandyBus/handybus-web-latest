import Button from '@/components/buttons/button/Button';
import { ShuttleRouteHubsInShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';

interface Props {
  date: string;
  time: string;
  hub: ShuttleRouteHubsInShuttleRoutesViewEntity;
}

const HubItem = ({ date, time, hub }: Props) => {
  const openKakaoMapWithLocation = () => {
    window.open(
      `https://map.kakao.com/link/map/${hub.name},${hub.latitude},${hub.longitude}`,
      '_blank',
    );
  };
  return (
    <li className="flex h-36 w-full items-center gap-16">
      <div className="w-80 shrink-0">
        <p className="text-10 font-400 text-basic-grey-700">{date}</p>
        <p className="text-12 font-600">{time}</p>
      </div>
      <div className="h-16 w-[1px] bg-basic-grey-100" />
      <div className="text-16 font-600">{hub.name}</div>
      <Button
        type="button"
        variant="tertiary"
        size="small"
        onClick={openKakaoMapWithLocation}
        className="ml-auto"
      >
        지도
      </Button>
    </li>
  );
};

export default HubItem;
