import { Meta, StoryObj } from '@storybook/react';
import RedirectButton from './RedirectButton';

const meta: Meta<typeof RedirectButton> = {
  title: 'Components/buttons/RedirectButton',
  component: RedirectButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof RedirectButton>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    href: '/',
  },
};

export const Secondary: Story = {
  args: {
    children: '쿠폰 사용하기',
    description: '핸디버스를 더 합리적으로 만날 수 있어요',
    onClick: () => {},
  },
};
