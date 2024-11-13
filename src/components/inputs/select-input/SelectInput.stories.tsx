import { Meta, StoryObj } from '@storybook/react';
import SelectInput from './SelectInput';
import { useState } from 'storybook/internal/preview-api';

const meta: Meta<typeof SelectInput> = {
  title: 'Components/Select',
  component: SelectInput,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SelectInput>;

export const ShowingPlaceHolder: Story = {
  args: {
    placeholder: '도/광역시',
    options: ['서울', '부산', '대구', '인천', '광주', '대전', '울산'],
  },
};

export const Default: Story = {
  args: {
    placeholder: '도/광역시',
    options: ['서울', '부산', '대구', '인천', '광주', '대전', '울산'],
    value: '서울',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '도/광역시',
    options: ['서울', '부산', '대구', '인천', '광주', '대전', '울산'],
    value: '서울',
    disabled: true,
  },
};

export const Interactice: Story = {
  args: {},
  render: function () {
    const options = ['서울', '부산', '대구', '인천', '광주', '대전', '울산'];
    const [value, setValue] = useState<string | undefined>(undefined);
    return (
      <SelectInput
        options={options}
        value={value}
        setValue={setValue}
        placeholder="지역"
        bottomSheetTitle="지역 선택"
      />
    );
  },
};
