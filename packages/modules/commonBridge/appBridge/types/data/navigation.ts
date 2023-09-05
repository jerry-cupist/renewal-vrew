export interface NavigateArg<
  ScreenNameType extends string = string,
  P = undefined
> {
  screenName: ScreenNameType;
  params?: P;
}

export interface PushArgs<ScreenNameType extends string = string, P = object>
  extends NavigateArg<ScreenNameType, P> {}

export type PopArgs = number | undefined;

export interface ReplaceArgs<ScreenNameType extends string = string, P = object>
  extends NavigateArg<ScreenNameType, P> {}

export interface ResetState {
  index: number;
  routes: NavigateArg[];
}
export interface ResetArgs extends ResetState {}

export interface OptionArgs {}
