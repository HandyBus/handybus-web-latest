import IconButton from '@/components/buttons/icon-button/IconButton';
import Button from '@/components/buttons/button/Button';
import ShareIcon from 'public/icons/share.svg';

interface BottomBarContentProps {
  message: string;
  openBottomSheet: () => void;
  variant: 'primary' | 'secondary' | 'alert' | 'modalSecondary';
  disabled?: boolean;
  isCheckDemand?: boolean;
  doesHaveShareButton?: boolean;
  onSubmit?: () => void;
}
const BottomBarContent = ({
  message,
  openBottomSheet,
  variant,
  disabled,
  isCheckDemand,
  doesHaveShareButton = true,
  onSubmit,
}: BottomBarContentProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 bg-white shadow-[0_-4px_4px_0_rgba(0,0,0,0.15)]">
      <div className="flex flex-col gap-4 px-16 py-8">
        {isCheckDemand && (
          <p className="text-12 font-400 leading-[19.2px] text-grey-500">
            수요 신청은 <span className="font-700">무료</span>이며, 수요 신청
            결과를 노선 개설에 활용합니다.
          </p>
        )}
        <div className=" flex justify-between gap-12">
          <Button variant={variant} disabled={disabled} onClick={onSubmit}>
            {message}
          </Button>
          {doesHaveShareButton && (
            <IconButton
              type="button"
              className="h-[44px] w-[44px]"
              onClick={openBottomSheet}
            >
              <ShareIcon />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomBarContent;
