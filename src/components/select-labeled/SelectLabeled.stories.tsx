import { Meta, StoryObj } from '@storybook/react';
import SelectLabeled from './SelectLabeled';
import { useState } from 'react';

const meta: Meta<typeof SelectLabeled> = {
  title: 'Components/SelectLabeled',
  component: SelectLabeled,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SelectLabeled>;

const cityOptions = [
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
] as const;

export const ShowingPlaceHolder: Story = {
  args: {
    placeholder: '도/광역시',
    options: cityOptions.map((v) => ({ label: v, value: v })),
  },
};

export const Default: Story = {
  args: {
    placeholder: '도/광역시',
    options: cityOptions.map((v) => ({ label: v, value: v })),
    value: { label: '서울', value: '서울' },
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '도/광역시',
    options: cityOptions.map((v) => ({ label: v, value: v })),
    value: { label: '서울', value: '서울' },
    disabled: true,
  },
};

export const Interactive: Story = {
  args: {},
  render: function () {
    const [value, setValue] = useState<string | undefined>(undefined);
    return (
      <SelectLabeled
        options={cityOptions.map((v) => ({ label: v, value: v }))}
        value={value ? { label: value, value } : undefined}
        setValue={(value) => setValue(value.value)}
        placeholder="지역"
        bottomSheetTitle="지역 선택"
      />
    );
  },
};

export const Underlined: Story = {
  args: {
    placeholder: '도/광역시',
    options: cityOptions.map((v) => ({ label: v, value: v })),
    value: { label: '서울', value: '서울' },
    isUnderLined: true,
  },
};
