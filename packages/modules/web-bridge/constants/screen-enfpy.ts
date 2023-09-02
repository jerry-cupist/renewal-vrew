/**
 * 스크린 이름을 location.pathName으로 정한다.
 * WEB URL과 통합관리
 */

export enum Screens {
  ROOT = "Root",
  MAIN = "Main",

  TAB_HOME = "TabHome",

  HOME = "Home",
  HOME_FAVOR_SETTING = "FavorSetting",

  PROFILE = "Profile",
  LOGIN = "Login",
}

export const ScreenPaths = {
  [Screens.ROOT]: "/",
  [Screens.MAIN]: "/main",
  [Screens.HOME]: "/home",
  [Screens.HOME_FAVOR_SETTING]: "/home/favor-setting",
  [Screens.PROFILE]: "/profile",
  [Screens.LOGIN]: "/login",
};

export type TypeOfScreenPaths = typeof ScreenPaths;
export type ValueOfScreenPaths = TypeOfScreenPaths[keyof TypeOfScreenPaths];
