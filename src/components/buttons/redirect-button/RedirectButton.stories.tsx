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
  },
};
