export type IconFactoryFunc = (fill: string, size: string) => JSX.Element;
export type IconFactory = Record<string, IconFactoryFunc>;
