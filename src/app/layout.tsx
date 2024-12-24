import type { Metadata } from 'next';
import './globals.css';
import '@/app/fonts/pretendard/font.css';
import Provider from '@/components/Provider';
import { ReactNode } from 'react';
import ToastContainer from '@/components/toast-container/ToastContainer';
import PortalContainer from '@/components/portal-container/PortalContainer';
import { DESCRIPTION, URL } from '@/constants/metadata';
import { TITLE } from '@/constants/metadata';

export const metadata: Metadata = {
  title: {
    template: `%s | ${TITLE}`,
    default: TITLE,
  },
  description: DESCRIPTION,
  keywords:
    '핸디버스, 수요응답형 모빌리티, 콘서트 셔틀, 공연 셔틀, 행사 셔틀, 맞춤형 셔틀, 콘서트 이동, 공연 이동, 행사 이동',
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    locale: 'ko_KR',
    url: URL,
    siteName: TITLE,
    images: [
      {
        url: URL + '/images/og-image.png',
        width: 480,
        height: 360,
        alt: '콘서트, 공연, 행사 등 다양한 이동의 여정에서 핸디버스를 만나보세요!',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [URL + '/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_CONSOLE_VERIFICATION,
    other: {
      naver: process.env.NEXT_PUBLIC_NAVER_CONSOLE_VERIFICATION ?? '',
    },
  },
};

const jsonLd = {
  '@context': URL,
  '@type': 'WebSite',
  name: TITLE,
  description: DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Provider>
          {children}
          <PortalContainer />
          <ToastContainer />
        </Provider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
