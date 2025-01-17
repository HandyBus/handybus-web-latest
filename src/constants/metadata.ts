export const TITLE = '핸디버스';
export const DESCRIPTION =
  '내 최애 콘서트로 가는 셔틀을 핸디버스에서 찾아보세요!';
export const URL = 'https://www.handybus.co.kr';
export const OG_IMAGE_URL = URL + '/images/og-image.png';

export const createMetadataWithOG = (
  title: string,
  imageUrl?: string,
  location?: string,
) => {
  const description = location
    ? `핸디버스를 통해 ${location}까지 내가 원하는 셔틀을 이용해보세요!`
    : DESCRIPTION;
  const image = imageUrl || OG_IMAGE_URL;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
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
  };
};
