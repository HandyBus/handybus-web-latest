import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'storybook/internal/preview-api';
import Tabs from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Static: Story = {
  args: {
    items: [
      { value: 10, label: '예약 현황' },
      { value: 20, label: '수요조사 현황' },
      { value: 30, label: '지난 예약' },
    ],
    selected: 30,
    onSelect: undefined,
  },
};

export const Interactice: Story = {
  args: {},
  render: function () {
    const items = [
      { value: 10, label: '예약 현황' },
      { value: 20, label: '수요조사 현황' },
      { value: 30, label: '지난 예약' },
    ];
    const [selected, setSelected] = useState<number>(30);
    return <Tabs items={items} selected={selected} onSelect={setSelected} />;
  },
};
