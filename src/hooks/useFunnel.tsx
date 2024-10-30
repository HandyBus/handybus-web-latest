import { ReactElement, ReactNode, useState } from 'react';

interface StepType<T> {
  name: T;
  children: ReactNode;
}

interface FunnelType<T> {
  children: Array<ReactElement<StepType<T>>>;
}

const useFunnel = <T,>(stepNames: readonly T[]) => {
  const [step, setStep] = useState<T>(stepNames[0]);

  const Step = (props: StepType<T>) => {
    const { children } = props;
    return <>{children}</>;
  };

  const Funnel = (props: FunnelType<T>) => {
    const { children } = props;

    const renderedStep = children.find(
      (childrenStep) => childrenStep.props.name === step,
    );

    return <>{renderedStep}</>;
  };

  const handleNextStep = () => {
    const currIndex = stepNames.indexOf(step);
    if (currIndex >= stepNames.length - 1) {
      return;
    }
    setStep(stepNames[currIndex + 1]);
  };

  const handlePrevStep = () => {
    const currIndex = stepNames.indexOf(step);
    if (currIndex <= 0) {
      return;
    }
    setStep(stepNames[currIndex - 1]);
  };

  return { Funnel, Step, setStep, handleNextStep, handlePrevStep };
};

export default useFunnel;
