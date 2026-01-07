'use client';

// import { useEffect, useRef } from 'react';
import Image from 'next/image';
import OverviewImage from './images/event-overview.png';
import OngoingDemandPeriodImage from './images/ongoing-demand-period.png';
// import InvitePaybackEventImage from './images/invite-payback-event-overview.png';
import Link from 'next/link';
import ArrowForwardIcon from '../icons/arrow-forward.svg';
import { getPhaseAndEnabledStatus } from '@/utils/event.util';
import { EventsViewEntity } from '@/types/event.type';
// import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
// import { useReferralTracking } from '@/hooks/analytics/useReferralTracking';
import LincOpenChatImage from './images/linc-open-chat.png';
import CxMPriceInfoImage from './images/cxm-price-info4x.png';

const CxM_EVENT_ID = '653100251283986798';

interface Props {
  event: EventsViewEntity;
  eventDetailImageUrl: string | null;
}

const EventOverview = ({ event, eventDetailImageUrl }: Props) => {
  const { phase, enabledStatus } = getPhaseAndEnabledStatus(event);
  // const { ref: imageRef, isInView } = useIntersectionObserver({
  //   threshold: 0.5,
  // });
  // const { trackViewInvitePaybackEventBanner } = useReferralTracking({
  //   eventId: event.eventId,
  //   eventName: event.eventName,
  // });

  // const timerRef = useRef<NodeJS.Timeout | null>(null);

  // useEffect(() => {
  //   if (isInView) {
  //     // 1초 이상 머물렀을 때만 집계 (스크롤로 빠르게 지나가는 것 제외)
  //     timerRef.current = setTimeout(() => {
  //       trackViewInvitePaybackEventBanner();
  //     }, 1000);
  //   } else {
  //     if (timerRef.current) {
  //       clearTimeout(timerRef.current);
  //       timerRef.current = null;
  //     }
  //   }

  //   return () => {
  //     if (timerRef.current) {
  //       clearTimeout(timerRef.current);
  //     }
  //   };
  // }, [isInView, trackViewInvitePaybackEventBanner]);

  return (
    <section className="relative w-full">
      <div className="relative w-full">
        {phase === 'demand' && enabledStatus === 'enabled' && (
          <Image
            src={OngoingDemandPeriodImage}
            alt="수요조사 기간 안내 이미지"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        )}
        {/* <div ref={imageRef}>
          <Image
            src={InvitePaybackEventImage}
            alt="친구 초대 페이백 이벤트 상세 이미지"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div> */}
        {event.eventId === CxM_EVENT_ID && (
          <a
            href="https://app.linc.fan/31TL/handybus_cxm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={LincOpenChatImage}
              alt="Linc 오픈채팅 참여하기 이미지"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-full"
            />
            <Image
              src={CxMPriceInfoImage}
              alt="CxM 가격 정보 이미지"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-full"
            />
          </a>
        )}
        <Image
          src={eventDetailImageUrl || OverviewImage}
          alt="행사 상세 이미지"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
      <div className="flex flex-col justify-center bg-basic-grey-50 px-32 pb-44">
        <Link
          href="/help/handybus-guide"
          className="flex h-[46px] items-center justify-center gap-[10px] rounded-[8px] text-16 font-600 leading-[160%] text-basic-grey-700"
        >
          이용방법 알아보기 <ArrowForwardIcon />
        </Link>
        <Link
          href="/help/faq"
          className="flex h-[46px] items-center justify-center gap-[10px] rounded-[8px] text-16 font-600 leading-[160%] text-basic-grey-700"
        >
          자주 묻는 질문 <ArrowForwardIcon />
        </Link>
      </div>
    </section>
  );
};

export default EventOverview;
