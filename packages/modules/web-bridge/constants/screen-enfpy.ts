export const WEB_URL = {
  ROOT: "/",
  LOGIN: "/login",
  PROFILE: "/profile",
  MAIN: "/main",
  MAIN_MBTI: "/main/mbti",
  SUB: "/sub",
} as const;

type WebUrlType = typeof WEB_URL;
type PageName = keyof WebUrlType;
export type WebPathnameType = WebUrlType[PageName];
type ScreenNameType =
  | Exclude<WebPathnameType extends `/${infer T}` ? T : never, "">
  | "root";

export type PathName = `/${string}`;
type RemoveSlash<PathNameType extends PathName> =
  PathNameType extends `/${infer T}` ? T : PathNameType;

const removeSlash = <T extends PathName>(pathname: T) => {
  return pathname
    .split("/")
    .filter((segment) => segment !== "")
    .join("/") as RemoveSlash<T>;
};

export type ScreenNameMapType = {
  [name in PageName]: name extends "ROOT"
    ? "root"
    : RemoveSlash<WebUrlType[name]>;
};

/**
 * WEB_URL 기반으로 생성합니다.
 * @note '/' 경로만 예외적으로 'root'가 이름이 됩니다.
 */
const buildScreenName = () => {
  const pageNames = Object.keys(WEB_URL) as PageName[];

  return pageNames.reduce(
    (prev: Record<string, ScreenNameType>, cur: PageName) => {
      const pageUrl = WEB_URL[cur];
      const screenName = removeSlash(pageUrl) as ScreenNameType;

      return {
        ...prev,
        [cur]: screenName,
      };
    },
    {}
  ) as ScreenNameMapType;
};

export const SCREEN_NAME = buildScreenName();

export type ValueOfScreenName = ScreenNameMapType[keyof ScreenNameMapType];

/**
 *
 * @example convertToScreenNameFromWebUrl("/profile/mbti") // "profile/mbti"
 */
export const convertToScreenNameFromWebUrl = <T extends WebPathnameType>(
  pathname: T
): ValueOfScreenName => {
  const screenName = removeSlash(pathname);
  return screenName === "" ? "root" : screenName;
};
