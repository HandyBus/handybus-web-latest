import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.handybus.co.kr';

  if (process.env.NODE_ENV !== 'production') {
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
