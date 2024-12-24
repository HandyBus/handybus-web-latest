import { Meta, StoryObj } from '@storybook/react';
import RadioButtons from './RadioButtons';
import { useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

const meta: Meta<typeof RadioButtons> = {
  title: 'Components/buttons/RadioButtons',
  component: RadioButtons,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof RadioButtons>;

// FormProvider를 포함한 래퍼 컴포넌트
const RadioButtonsWithForm = (
  args: any, // eslint-disable-line @typescript-eslint/no-explicit-any
) => {
  const methods = useForm({
    defaultValues: {
      gender: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <RadioButtons {...args} />
    </FormProvider>
  );
};

export const Primary: Story = {
  render: (args) => <RadioButtonsWithForm {...args} />,
  args: {
    values: ['여성', '남성'],
    setValue: () => {},
    disabled: false,
    name: 'gender',
  },
};
