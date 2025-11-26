'use client';

import type { ActivityComponentType } from '@stackflow/react';
import ProfileEdit from '@/app/mypage/profile/edit/ProfileEdit.content';
import StackAppScreen from '@/stacks/StackAppScreen';

const ProfileEditActivity: ActivityComponentType = () => {
  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <ProfileEdit />
      </div>
    </StackAppScreen>
  );
};

export default ProfileEditActivity;
