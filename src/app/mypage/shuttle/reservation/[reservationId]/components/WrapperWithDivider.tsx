import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const WrapperWithDivider = ({ children }: Props) => {
  return (
    <>
      <Divider />
      {children}
    </>
  );
};

export default WrapperWithDivider;

const Divider = () => {
  return <div className="h-8 w-full bg-basic-grey-50" />;
};
