import type { Metadata } from 'next';
import * as Sentry from '@sentry/nextjs';
import './globals.css';
import '@/app/fonts/pretendard/font.css';
import '@/app/fonts/dm-sans/font.css';
import Provider from '@/components/provider/Provider';
import { ReactNode } from 'react';
import ToastContainer from '@/components/toast-container/ToastContainer';
import PortalContainer from '@/components/portal-container/PortalContainer';
import { DESCRIPTION, KEYWORDS, OG_IMAGE_URL, URL } from '@/constants/metadata';
import { TITLE } from '@/constants/metadata';
import Script from 'next/script';
import 'react-loading-skeleton/dist/skeleton.css';
import ServiceMaintenanceScreen from '@/components/service-maintenance-screen/ServiceMaintenanceScreen';

const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';
const FAVICON_PROD = '/favicons/favicon.ico';
const FAVICON_DEV = '/favicons/favicon-dev.png';

export const metadata: Metadata = {
  title: {
    template: `%s | ${TITLE}`,
    default: TITLE,
  },
  description: DESCRIPTION,
  keywords: KEYWORDS,
  icons: {
    icon: isProduction
      ? [{ url: FAVICON_PROD, type: 'image/x-icon' }]
      : [{ url: FAVICON_DEV, type: 'image/png' }],
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    locale: 'ko_KR',
    url: URL,
    siteName: TITLE,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 480,
        height: 360,
        alt: '콘서트, 공연, 행사 등 다양한 이동의 여정에서 핸디버스를 만나보세요!',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      'naver-site-verification':
        process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION ?? '',
    },
  },
  other: {
    ...Sentry.getTraceData(),
  },
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: TITLE,
  description: DESCRIPTION,
  url: URL,
};

export default function RootLayout(
  {
    // children,
  }: Readonly<{
    children: ReactNode;
  }>,
) {
  return (
    <html lang="ko">
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
              debug_mode: ${process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production'},
            });
          `,
          }}
        />
        <Script
          strategy="afterInteractive"
          src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/ko_KR/appleid.auth.js"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body className="bg-basic-white">
        <Provider>
          {/* {children} */}
          {/* NOTE: 서비스 점검 시 children 주석 처리 후 아래 주석 해제 */}
          <ServiceMaintenanceScreen />
          <PortalContainer />
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
