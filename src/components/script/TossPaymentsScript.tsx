import Script from 'next/script';

interface Props {
  onReady?: () => void;
}

const TossPaymentsScript = ({ onReady }: Props) => {
  return (
    <Script
      src="https://js.tosspayments.com/v2/standard"
      onReady={onReady}
      strategy="afterInteractive"
    />
  );
};

export default TossPaymentsScript;
