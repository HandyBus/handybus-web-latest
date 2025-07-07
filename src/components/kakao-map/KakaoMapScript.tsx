import Script from 'next/script';

const KAKAO_MAP_SCRIPT_ID = 'kakao-maps-sdk';

interface Props {
  onReady?: () => void;
  libraries?: string[];
}

const KakaoMapScript = ({ onReady, libraries }: Props) => {
  const librariesString = libraries ? libraries.join(',') : '';

  return (
    <Script
      id={KAKAO_MAP_SCRIPT_ID}
      strategy="afterInteractive"
      src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&autoload=false&libraries=${librariesString}`}
      onReady={onReady}
    />
  );
};

export default KakaoMapScript;
