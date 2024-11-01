import { Meta, StoryObj } from '@storybook/react';
import AskHandyButton from './AskHandyButton';

const meta: Meta<typeof AskHandyButton> = {
  title: 'Components/AskHandyButton',
  component: AskHandyButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AskHandyButton>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
  },
};
