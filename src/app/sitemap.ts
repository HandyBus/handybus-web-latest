import { MetadataRoute } from 'next';
import { getEvents } from '@/services/event.service';
import { stat, readdir } from 'fs/promises';
import { join } from 'path';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.handybus.co.kr';

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
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reservation`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/help/about`,
      lastModified: aboutLastModified,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/help/faq`,
      lastModified: faqLastModified,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/help/faq/terms-of-service`,
      lastModified: termsLastModified,
      priority: 0.1,
    },
    {
      url: `${baseUrl}/help/faq/privacy-policy`,
      lastModified: privacyLastModified,
      priority: 0.1,
    },
    {
      url: `${baseUrl}/help/faq/marketing-consent`,
      lastModified: marketingLastModified,
      priority: 0.1,
    },
  ];

  const events = await getEvents({ status: 'STAND_BY,OPEN' });
  const eventsArray = events.map((event) => ({
    url: `${baseUrl}/event/${event.eventId}`,
    lastModified: new Date(event.updatedAt),
    priority: 0.8,
  }));
  const dynamicRoutes = [...eventsArray];

  return [...staticRoutes, ...dynamicRoutes];
}

// 약관 파일들의 실제 수정일을 가져오는 함수
const getPolicyLastModified = async (policyPath: string): Promise<Date> => {
  try {
    const fullPath = join(
      process.cwd(),
      'src/data/policy',
      `${policyPath}.mdx`,
    );
    const stats = await stat(fullPath);
    return stats.mtime;
  } catch {
    console.warn(`Policy file not found: ${policyPath}.mdx`);
    return new Date();
  }
};

// 디렉토리 내 모든 파일의 수정일을 검사하여 가장 최근 날짜를 반환하는 함수
const getDirectoryLastModified = async (
  directoryPath: string,
): Promise<Date> => {
  try {
    const fullPath = join(process.cwd(), 'src/app', directoryPath);
    const files = await readdir(fullPath, { withFileTypes: true });

    let latestDate = new Date('2025-01-15T00:00:00Z');

    for (const file of files) {
      if (file.isFile()) {
        const filePath = join(fullPath, file.name);
        const stats = await stat(filePath);
        if (stats.mtime > latestDate) {
          latestDate = stats.mtime;
        }
      }
    }

    return latestDate;
  } catch {
    console.warn(`Directory not found or error reading: ${directoryPath}`);
    return new Date('2025-01-15T00:00:00Z');
  }
};

// 실제 수정일을 가져옵니다
const [
  termsLastModified,
  privacyLastModified,
  marketingLastModified,
  aboutLastModified,
  faqLastModified,
] = await Promise.all([
  getPolicyLastModified('service'),
  getPolicyLastModified('privacy'),
  getPolicyLastModified('marketing'),
  getDirectoryLastModified('help/about'),
  getDirectoryLastModified('help/faq'),
]);
