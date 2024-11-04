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
      { value: 10, label: '예약 내역' },
      { value: 20, label: '수요 확인 내역' },
      { value: 30, label: '지난 콘서트' },
    ],
    selected: 30,
    onSelect: undefined,
  },
};

export const Interactice: Story = {
  args: {},
  render: function () {
    const items = [
      { value: 10, label: '예약 내역' },
      { value: 20, label: '수요 확인 내역' },
      { value: 30, label: '지난 콘서트' },
    ];
    const [selected, setSelected] = useState<number>(30);
    return <Tabs items={items} selected={selected} onSelect={setSelected} />;
  },
};
