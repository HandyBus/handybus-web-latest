import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: {
    template: `%s | ${TITLE}`,
    default: TITLE,
  },
  description: DESCRIPTION,
  keywords: KEYWORDS,
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
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: TITLE,
  description: DESCRIPTION,
  url: URL,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
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
            });
          `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body>
        <Provider>
          {children}
          <PortalContainer />
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
