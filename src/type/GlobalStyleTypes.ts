export interface GlobalStyleColor {
  '--color-plain': string;
  '--color-focus': string;
  '--color-desc': string;
  '--color-neon': string;
  '--color-warn': string;
  '--color-calm': string;
  '--color-background': string;
  '--color-background-fade': string;
}

export type DisplayThemeMode = 'dark' | 'light';

export type GlobalStyleColorName = keyof GlobalStyleColor;
