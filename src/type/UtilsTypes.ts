export type IconFactoryFunc = (fill: string, size: string) => JSX.Element;
export type IconFactory = Record<string, IconFactoryFunc>;
export type DynamicClassName = Array<
  string | Record<string, boolean> | undefined | null
>;
