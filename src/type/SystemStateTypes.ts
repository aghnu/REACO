export interface PromptInfo {
  userName: string;
  systemDomain: string;
  systemPath: string;
}

export interface PromptApp {
  promptStr: string;
  input: string;
  id: string;
  inputListener: (input: string) => void;
}
