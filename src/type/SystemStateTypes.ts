import { type AppName } from './ApplicationTypes';

export interface PromptInfo {
  userName: string;
  systemDomain: string;
  systemPath: string;
}

export interface PromptApp {
  promptStr: string;
  input: string;
  id: AppName;
  inputListener: (input: string) => void;
}

export interface PromptHistory {
  promptType: PromptHistoryType;
  promptMessage: string;
}

export type PromptHistoryType = AppName | 'userInput';
