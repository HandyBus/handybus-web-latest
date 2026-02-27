export const TITLE = '핸디버스';
export const DEFAULT_TITLE = '핸디버스 - 팬덤 이동의 시작과 끝';
export const DESCRIPTION =
  '콘서트부터 페스티벌까지, 다양한 행사 전용 셔틀 서비스. 수요에 따라 버스, 택시팟을 예약해보세요.';
export const KEYWORDS =
  '핸디버스, 수요응답형 모빌리티, 콘서트 셔틀, 공연 셔틀, 행사 셔틀, 맞춤형 셔틀, 콘서트 이동, 공연 이동, 행사 이동, 셔틀, 버스, 택시, 택시팟, 핸디팟, 차대절, 버스 대절';
export const URL = 'https://www.handybus.co.kr';
export const OG_IMAGE_URL = URL + '/images/og-image.png';

// Open Graph 이미지 권장 크기: 1200x630 (1.91:1 비율)
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;

const convertToAbsoluteUrl = (path: string): string => {
  // 이미 절대 URL인 경우 그대로 반환
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  // 상대 경로인 경우 절대 경로로 변환 (슬래시 정확히 1개 보장)
  return URL.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
};

export const createMetadataWithOG = ({
  title,
  keywords,
  imageUrl,
  location,
  url,
}: {
  title: string;
  keywords?: string;
  imageUrl?: string;
  location?: string;
  url?: string;
}) => {
  const description = location
    ? `핸디버스를 통해 ${location}까지 내가 원하는 셔틀을 이용해보세요!`
    : DESCRIPTION;
  const image = imageUrl ? convertToAbsoluteUrl(imageUrl) : OG_IMAGE_URL;
  const ogUrl = url ? convertToAbsoluteUrl(url) : URL;
  return {
    title,
    description,
    keywords: KEYWORDS + ', ' + keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'ko_KR',
      url: ogUrl,
      siteName: TITLE,
      images: [
        {
          url: image,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
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
  };
};
