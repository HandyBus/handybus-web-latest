'use client';

import { useGetHubsWithPagination } from '@/services/hub.service';
import PinIcon from '../../../icons/pin-small.svg';
import { useMemo } from 'react';
import { groupHubsByRegion } from '../../../store/datesWithHubsAtom';
import { ID_TO_REGION } from '@/constants/regions';
import { EventFormValues } from '../../../form.type';
import { useFormContext } from 'react-hook-form';
import { RegionHubsResponseModel } from '@/types/hub.type';

interface Props {
  toNextStep: () => void;
}

const DemandHubsStep = ({ toNextStep }: Props) => {
  const { getValues, setValue } = useFormContext<EventFormValues>();
  const sido = getValues('sido');

  const { data: regionsWithHubs } = useGetHubsWithPagination(
    {
      // TODO: 장소 태깅 완료하고 주석 해제하기
      // usageType: 'SHUTTLE_HUB',
      provinceFullName: sido,
    },
    { enabled: !!sido },
  );

  const gungusWithHubs = useMemo(() => {
    const hubs = regionsWithHubs?.pages?.[0]?.regionHubs;
    if (!hubs) {
      return [];
    }
    const hubsWithRegion = hubs.map((hub) => {
      const hubRegion = ID_TO_REGION[hub.regionId];
      return {
        ...hub,
        sido: hubRegion.bigRegion,
        gungu: hubRegion.smallRegion,
      };
    });
    const groupedHubs = groupHubsByRegion(hubsWithRegion);
    const gungusWithHubs = groupedHubs?.[sido] ?? [];
    const gungusWithFlattenedHubs = Object.entries(gungusWithHubs)
      .map(([gungu, hubs]) => {
        return {
          gungu,
          hubs: hubs.flat(),
        };
      })
      .toSorted((a, b) => a.gungu.localeCompare(b.gungu));
    return gungusWithFlattenedHubs;
  }, [regionsWithHubs]);

  const handleHubClick = (hub: RegionHubsResponseModel) => {
    setValue('selectedHubForDemand', hub);
    toNextStep();
  };

  return (
    <section>
      {gungusWithHubs.map((gunguWithHubs, index) => (
        <article key={gunguWithHubs.gungu}>
          <div className="mb-4 flex h-[26px] items-center gap-[2px]">
            <PinIcon />
            <h6 className="text-14 font-700 text-basic-grey-600">
              {gunguWithHubs.gungu}
            </h6>
            <p className="ml-auto text-14 font-500 text-brand-primary-400">
              NN명이 요청했어요
            </p>
          </div>
          <ul>
            {gunguWithHubs.hubs.map((hub) => (
              <button
                key={hub.regionHubId}
                onClick={() => handleHubClick(hub)}
                type="button"
                className="flex h-[55px] w-full items-center justify-between gap-8 py-12"
              >
                <span className="text-16 font-600 text-basic-grey-700">
                  {hub.name}
                </span>
              </button>
            ))}
          </ul>
          {index !== gungusWithHubs.length - 1 && (
            <div className="my-12 h-[1px] w-full bg-basic-grey-100" />
          )}
        </article>
      ))}
      {gungusWithHubs.length === 0 && <div className="h-148" />}
    </section>
  );
};

export default DemandHubsStep;
