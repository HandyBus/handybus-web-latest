import Button from '@/components/buttons/button/Button';

const BottomBarDemandRequest = ({
  message,
  // disabled,
  onSubmit,
}: {
  message: string;
  disabled: boolean;
  onSubmit?: () => void;
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 bg-white shadow-[0_-4px_4px_0_rgba(0,0,0,0.15)]">
      <div className="flex flex-col gap-4 px-16 py-8">
        <Button variant="primary" onClick={onSubmit}>
          {message}
        </Button>
      </div>
    </div>
  );
};

export default BottomBarDemandRequest;