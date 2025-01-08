export const BOTTOM_BAR_TYPE = {
  DEMAND: 'DEMAND',
  RESERVATION: 'RESERVATION',
  DEMAND_WRITE: 'DEMAND_WRITE',
  RESERVATION_WRITE: {
    STEP_1: 'RESERVATION_WRITE_1',
    STEP_2: 'RESERVATION_WRITE_2',
    STEP_3: 'RESERVATION_WRITE_3',
    STEP_4: 'RESERVATION_WRITE_4',
    COMPLETED: 'RESERVATION_WRITE_COMPLETED',
    FAIL: 'RESERVATION_WRITE_FAIL',
    CONFLICT: 'RESERVATION_WRITE_CONFLICT',
  },
} as const;

export type BottomBarType =
  | (typeof BOTTOM_BAR_TYPE)[keyof typeof BOTTOM_BAR_TYPE]
  | (typeof BOTTOM_BAR_TYPE.RESERVATION_WRITE)[keyof typeof BOTTOM_BAR_TYPE.RESERVATION_WRITE];

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'alert'
  | 'modalSecondary';

export interface BaseBottomBarProps {
  variant?: ButtonVariant;
  disabled?: boolean;
  onSubmit?: () => void;
  openBottomSheet?: () => void;
}

export interface StepProps extends BaseBottomBarProps {
  handleNextStep?: () => void;
  handlePrevStep?: () => void;
}
