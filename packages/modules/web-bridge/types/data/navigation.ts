import { ValueOfScreenName } from "../../constants/screen-enfpy";

export interface NavigateArg<P = undefined> {
  screenName: ValueOfScreenName;
  params?: P;
}

export interface PushArgs<P = object> extends NavigateArg<P> {}

export type PopArgs = number | undefined;

export interface ReplaceArgs<P = object> extends NavigateArg<P> {}

export interface ResetState {
  index: number;
  routes: NavigateArg[];
}
export interface ResetArgs extends ResetState {}

export interface OptionArgs {}
