import { Meta, StoryObj } from '@storybook/react';
import HandyRequestModal from './HandyRequestModal';

const meta: Meta<typeof HandyRequestModal> = {
  title: 'Components/HandyRequestModal',
  component: HandyRequestModal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof HandyRequestModal>;

export const Primary: Story = {
  args: {},
};
