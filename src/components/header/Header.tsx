'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import LogoIcon from 'public/icons/logo-v3.svg';
import BackIcon from './icons/back.svg';
import HomeIcon from './icons/home.svg';
import AnnouncementsIcon from './icons/announcement.svg';
import { useEffect, useState } from 'react';
import useEnvironment from '@/hooks/useEnvironment';

interface HeaderProps {
  showBackButton?: boolean; // 홈에서 모든 행사페이지로 이동한 경우를 판단합니다.
}

const Header = ({ showBackButton = false }: HeaderProps) => {
  // 경로에 따른 페이지명 표시
  const router = useRouter();
  const { isApp, platform } = useEnvironment();
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);

  const isHideBackButton =
    PATHNAME_TO_HIDE_BACK_BUTTON.includes(pathname) && !showBackButton;

  const normalizePath = (path: string) => {
    return path
      .split('/')
      .map((segment) => {
        // 순수 숫자 패턴
        const isNumericId = /^\d+$/.test(segment);
        // UUID 패턴
        const isUuidId =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
            segment,
          );

        return isNumericId || isUuidId ? ':id' : segment;
      })
      .join('/');
  };

  const getPageName = (path: string) => {
    const normalizedPath = normalizePath(path);
    return (
      URL_TO_PAGE_NAME?.[normalizedPath as keyof typeof URL_TO_PAGE_NAME] || ''
    );
  };
  const pageName = getPageName(pathname);

  // 스크롤을 내리면 헤더의 색상이 투명에서 흰색으로 변경됩니다.
  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHome]);

  const headerBgClass = isHome
    ? isScrolled
      ? 'bg-basic-white'
      : 'bg-transparent'
    : 'bg-basic-white';

  const iconColorClass = isHome && !isScrolled ? 'brightness-0 invert' : '';

  const statusBarPaddingClass = isApp
    ? platform === 'ios'
      ? 'pt-48 h-[88px]'
      : platform === 'android'
        ? 'pt-32 h-76'
        : ''
    : '';

  return (
    <header
      className={`sticky top-0 z-50 flex h-56 w-full items-center justify-between px-16 py-12 transition-colors duration-300 ${headerBgClass} ${statusBarPaddingClass}`}
    >
      {isHome ? (
        <LogoIcon
          className={`duration-1100 transition-all ${iconColorClass}`}
        />
      ) : (
        <div className="flex items-center">
          {isApp && !isHideBackButton && (
            <button type="button" onClick={() => router.back()}>
              <BackIcon />
            </button>
          )}
          <h1 className="text-18 font-700 leading-[140%] text-basic-black">
            {pageName}
          </h1>
        </div>
      )}

      <div className="flex items-center gap-8">
        {!isHome && (
          <Link href="/">
            <HomeIcon />
          </Link>
        )}
        <Link href="/announcements">
          <AnnouncementsIcon
            className={`transition-all duration-300 ${iconColorClass}`}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;

// 새로운 페이지 개발 시 이곳에 페이지명을 추가해주세요.
const URL_TO_PAGE_NAME = {
  '/login': '로그인',
  '/event': '모든 행사',
  '/event/:id': '행사 정보',
  '/ticket': '모든 탑승권',
  '/ticket/:id': '탑승권',
  '/history': '참여/예약 내역',
  '/history/reservation/:id': '예약 정보',
  '/history/reservation/:id/reservation-transfer': '선물하기',
  '/history/reservation/:id/reservation-transfer/success': '선물 완료',
  '/history/demand/:id': '수요조사 정보',
  '/mypage': '마이페이지',
  '/mypage/profile/edit': '프로필 수정',
  '/mypage/settings': '환경설정',
  '/mypage/coupons': '쿠폰',
  '/mypage/reviews': '내 후기',
  '/mypage/reviews/write/:id': '후기 작성',
  '/mypage/alert-requests': '빈자리 알림',
  '/mypage/alert-requests/:id': '빈자리 알림 정보',
  '/mypage/boarding-pass/:id': '탑승권',
  '/announcements': '공지사항',
  '/announcements/:id': '공지글',
  '/help/about': '서비스 소개',
  '/help/handybus-guide': '이용 방법',
  '/help/faq': '도움말',
  '/help/faq/direct-inquiry': '직접 문의하기',
  '/help/faq/terms-of-service': '서비스 이용 약관',
  '/help/faq/privacy-policy': '개인정보 처리 방침',
  '/help/faq/marketing-consent': '마케팅 활용 동의',
  '/accept-reservation-transfer/:id': '탑승권 선물',
  '/accept-reservation-transfer/:id/success': '선물 완료',
  '/accept-reservation-transfer/:id/fail': '탑승권 선물',
};

const PATHNAME_TO_HIDE_BACK_BUTTON = [
  '/',
  '/event',
  '/history',
  '/mypage',
  '/ticket',
];
