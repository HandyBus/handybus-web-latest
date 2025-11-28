import { ActivityComponentType, stackflow } from '@stackflow/react';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { historySyncPlugin } from '@stackflow/plugin-history-sync';

// 각 activity들의 Params 타입을 제한하지 않기 위해 any 사용
type BaseActivities = Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ActivityComponentType<any>
>;

export const createStackflowConfig = <T extends BaseActivities>(
  activities: T,
  routes: Record<keyof T, string>,
  fallbackActivity: Extract<keyof T, string>,
) => ({
  transitionDuration: 270,
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
    }),
    historySyncPlugin({
      routes: routes as Record<string, string>,
      fallbackActivity: () => fallbackActivity,
    }),
  ],
  activities,
});

export const createStack = <T extends BaseActivities>(
  activities: T,
  routes: Record<keyof T, string>,
  fallbackActivity: Extract<keyof T, string>,
) => stackflow(createStackflowConfig(activities, routes, fallbackActivity));
