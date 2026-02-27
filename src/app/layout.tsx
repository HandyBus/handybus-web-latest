import type { Metadata, Viewport } from 'next';
import * as Sentry from '@sentry/nextjs';
import './globals.css';
import '@/app/fonts/pretendard/font.css';
import '@/app/fonts/dm-sans/font.css';
import Provider from '@/components/provider/Provider';
import { ReactNode } from 'react';
import ToastContainer from '@/components/toast-container/ToastContainer';
import PortalContainer from '@/components/portal-container/PortalContainer';
import {
  DEFAULT_TITLE,
  DESCRIPTION,
  KEYWORDS,
  OG_IMAGE_URL,
  URL,
} from '@/constants/metadata';
import { TITLE } from '@/constants/metadata';
import Script from 'next/script';
import 'react-loading-skeleton/dist/skeleton.css';
// import ServiceMaintenanceScreen from '@/components/service-maintenance-screen/ServiceMaintenanceScreen';

const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';
const FAVICON_PROD = '/favicons/favicon.ico';
const FAVICON_DEV = '/favicons/favicon-dev.ico';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: {
    template: `%s | ${TITLE}`,
    default: DEFAULT_TITLE,
  },
  description: DESCRIPTION,
  keywords: KEYWORDS,
  icons: {
    icon: isProduction
      ? [{ url: FAVICON_PROD, type: 'image/x-icon' }]
      : [{ url: FAVICON_DEV, type: 'image/x-icon' }],
  },
  openGraph: {
    title: {
      template: `%s | ${TITLE}`,
      default: DEFAULT_TITLE,
    },
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

// WebSite 및 Organization 구조화 데이터
const JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: TITLE,
    description: DESCRIPTION,
    url: URL,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '주식회사 스테이브',
    alternateName: '핸디버스',
    url: URL,
    logo: `${URL}/icons/logo-v3.svg`,
    description: DESCRIPTION,
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        {isProduction && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`,
            }}
          />
        )}
        <Script
          strategy="afterInteractive"
          src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/ko_KR/appleid.auth.js"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {isProduction && (
          <>
            <Script
              strategy="afterInteractive"
              src="https://cdn.amplitude.com/script/9cbe7057622300e485434d044765ce75.js"
            />
            <Script
              id="amplitude-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.amplitude.add(window.sessionReplay.plugin({sampleRate: 1}));
                  window.amplitude.init('9cbe7057622300e485434d044765ce75', {
                    "fetchRemoteConfig": true,
                    "autocapture": {
                      "attribution": true,
                      "fileDownloads": true,
                      "formInteractions": true,
                      "pageViews": true,
                      "sessions": true,
                      "elementInteractions": true,
                      "networkTracking": true,
                      "webVitals": true,
                      "frustrationInteractions": {
                        "errorClicks": true,
                        "deadClicks": true,
                        "rageClicks": true
                      }
                    }
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="bg-basic-white">
        {isProduction && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <Provider>
          {children}
          {/* NOTE: 서비스 점검 시 children 주석 처리 후 아래 주석 해제 */}
          {/* <ServiceMaintenanceScreen /> */}
          <PortalContainer />
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
