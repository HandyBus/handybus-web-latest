import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.handybus.co.kr';

  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') {
    return {
      rules: {
        userAgent: '*',
        disallow: '*',
      },
    };
  }
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/mypage', '/mypage/*'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
