import type BaseApplication from '@base/BaseApplication';
import type APPLICATION_INDEX from '@/applications';

export type AppNames = keyof typeof APPLICATION_INDEX;
export type AppMeta = (typeof APPLICATION_INDEX)[AppNames];

export interface AppInstance {
  id: string;
  name: AppNames;
  instance: BaseApplication;
}

export interface ApplicationState {
  apps: AppInstance[];
}
