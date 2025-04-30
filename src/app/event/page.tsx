import { getEvents } from '@/services/event.service';
import { fromString, toDemandSort } from '../demand/utils/param.util';
import { toSorted } from '../demand/utils/toSorted.util';
import Header from '@/components/header/Header';
import Empty from './components/Empty';
import Card from '@/components/card/Card';
import ChevronRightEm from 'public/icons/chevron-right-em.svg';
// import FilterBar from './components/FilterBar';

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const Page = async ({ searchParams }: Props) => {
  const type =
    (Array.isArray(searchParams?.type)
      ? searchParams?.type[0]
      : searchParams?.type) || 'CONCERT';

  const typeValue = type === 'FESTIVAL' ? 'FESTIVAL' : 'CONCERT';

  const sort = fromString(
    (Array.isArray(searchParams?.sort)
      ? searchParams?.sort[0]
      : searchParams?.sort) || '',
  );

  const events = await getEvents({ status: 'OPEN' });

  const filteredEvents = events
    ? events.filter((event) => event.eventType === typeValue)
    : [];

  const sortedEvents =
    filteredEvents.length > 0
      ? toSorted(filteredEvents, toDemandSort(sort))
      : [];

  return (
    <>
      <Header />
      {/* <FilterBar type={typeValue} sort={sort} /> */}
      <div className="flex w-full flex-col items-center">
        {sortedEvents.length === 0 ? (
          <Empty />
        ) : (
          sortedEvents.map((event) => (
            <div className="w-full px-[16px] py-[6px]" key={event.eventId}>
              <Card
                key={event.eventId}
                image={event.eventImageUrl}
                variant="SMALL"
                title={event.eventName}
                href={`/event/${event.eventId}`}
              />
            </div>
          ))
        )}
        <div className="h-8 w-full bg-basic-grey-50" />
        <a
          className="flex w-full items-center justify-center gap-[10px] bg-basic-white px-[12px] py-[10px] pt-[26px] text-16 font-600 leading-[160%] text-basic-grey-700"
          href={process.env.NEXT_PUBLIC_NEW_SHUTTLE_FORM_URL ?? ''}
          target="_blank"
        >
          원하는 행사가 없다면
          <ChevronRightEm className="h-16 w-16 stroke-1 text-basic-grey-700" />
        </a>
      </div>
    </>
  );
};

export default Page;
