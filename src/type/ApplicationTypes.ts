import type BaseApplication from '@base/BaseApplication';
import type APPLICATION_INDEX from '@/applications';

export type AppName = keyof typeof APPLICATION_INDEX;
export type AppMeta = (typeof APPLICATION_INDEX)[AppName];

export interface AppInstance {
  id: string;
  name: AppName;
  instance: BaseApplication;
}

export interface ApplicationState {
  apps: AppInstance[];
}

export type PrintJobType = 'print' | 'update';
export interface PrintJob {
  type: PrintJobType;
  callback: () => void;
}

export interface DataProject {
  title: string;
  tags: string;
  desc: string;
  links: Array<{
    title: string;
    link: string;
  }>;
}

export interface DataSkill {
  name: string;
  skills: string[];
}
