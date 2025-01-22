import { Meta, StoryObj } from '@storybook/react';
import TextInput from './TextInput';
import { FormProvider, useForm } from 'react-hook-form';

const meta: Meta<typeof TextInput> = {
  title: 'Components/inputs/TextInput',
  component: TextInput,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TextInput>;
type TextInputProps = React.ComponentProps<typeof TextInput>;

const TextInputWrapper = (args: TextInputProps) => {
  const methods = useForm({
    defaultValues: {
      testInput: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <TextInput {...args} />
    </FormProvider>
  );
};

export const Primary: Story = {
  render: (args) => <TextInputWrapper {...args} />,
  args: {
    name: 'testInput',
    control: undefined,
    setValue: () => {},
    placeholder: '텍스트를 입력하세요',
    children: '입력 라벨',
  },
};
