'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import ProfileEdit from '@/app/mypage/profile/edit/ProfileEdit.content';

const ProfileEditActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <ProfileEdit />
      </div>
    </AppScreen>
  );
};

export default ProfileEditActivity;
