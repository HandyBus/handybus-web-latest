import { MetadataRoute } from 'next';
import { getEvents } from '@/services/event.service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.handybus.co.kr';
  type ChangeFreq =
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';

  /*
   * priority: 0 ~ 1 사이의 값으로 설정해주세요. 검색엔진의 크롤링 빈도에 영향을 줍니다.
   * lastModified는 페이지의 마지막 수정된 날짜를 나타냅니다.
   * changeFrequency는 페이지가 얼마나 자주 변경될 것으로 예상되는지 검색엔진에 알려주는 지표입니다. 실제로 페이지의 내용이 변경되지 않았는데 빈도를 높게 설정하면 검색엔진이 신뢰도를 낮게 평가할 수 있습니다.
   * priority, changeFrequency는 google에서 절대적으로 반영하지않고 참고만 하는것으로 알려져있습니다.
   * help 섹션과 같은 경우는 페이지의 내용이 바뀌지 않기 때문에 날짜를 고정해 두었습니다. 이후 내용이 바뀌면 날짜를 업데이트 해주세요.
   */
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: `${baseUrl}/demand`,
      lastModified: new Date(),
      changeFrequency: 'daily' as ChangeFreq,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reservation`,
      lastModified: new Date(),
      changeFrequency: 'daily' as ChangeFreq,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/help/reviews`,
      lastModified: new Date(),
      changeFrequency: 'daily' as ChangeFreq,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/help/about`,
      lastModified: new Date('2025-01-15T00:00:00Z'),
      priority: 0.6,
    },
    {
      url: `${baseUrl}/help/how-to`,
      lastModified: new Date('2025-01-15T00:00:00Z'),
      priority: 0.6,
    },
    {
      url: `${baseUrl}/help/what-is-handy`,
      lastModified: new Date('2025-01-15T00:00:00Z'),
      priority: 0.6,
    },
    {
      url: `${baseUrl}/help/faq`,
      lastModified: new Date('2025-01-15T00:00:00Z'),
      priority: 0.6,
    },
    {
      url: `${baseUrl}/policy`,
      lastModified: new Date('2025-01-15T00:00:00Z'),
      priority: 0.5,
    },
  ];

  const events = await getEvents({ status: 'OPEN' });
  const eventsArray = events.map((event) => ({
    url: `${baseUrl}/event/${event.eventId}`,
    lastModified: new Date(event.updatedAt),
    // changeFrequency: 'weekly' as ChangeFreq,
    priority: 0.8,
  }));
  const dynamicRoutes = [...eventsArray];

  return [...staticRoutes, ...dynamicRoutes];
}
