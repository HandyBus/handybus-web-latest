'use client';

import Button from '@/components/buttons/button/Button';
import { handleExternalLink } from '@/utils/externalLink.util';

interface Props {
  children: React.ReactNode;
}

const RequestEventButton = ({ children }: Props) => {
  return (
    <Button
      className="w-[calc(100%-64px)]"
      variant="secondary"
      onClick={() => {
        handleExternalLink(process.env.NEXT_PUBLIC_NEW_SHUTTLE_FORM_URL ?? '');
      }}
    >
      {children}
    </Button>
  );
};

export default RequestEventButton;
