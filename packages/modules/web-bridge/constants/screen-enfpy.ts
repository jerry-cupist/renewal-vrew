/**
 * 스크린 이름을 WEB_URL기준으로 생성합니다.
 */

import {
  ENFPY_WEB_URL,
  EnfpyPathnameType,
  EnfpyWebPathnameType,
  EnfpyWebUrlType,
} from "./page-enpfy";

type ScreenNameType =
  | Exclude<EnfpyWebPathnameType extends `/${infer T}` ? T : never, "">
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
  [name in EnfpyPathnameType]: name extends "ROOT"
    ? "root"
    : RemoveSlash<EnfpyWebUrlType[name]>;
};

/**
 * WEB_URL 기반으로 생성합니다.
 * @note '/' 경로만 예외적으로 'root'가 이름이 됩니다.
 */
const buildScreenName = () => {
  const pageNames = Object.keys(ENFPY_WEB_URL) as EnfpyPathnameType[];

  return pageNames.reduce(
    (prev: Record<string, ScreenNameType>, cur: EnfpyPathnameType) => {
      const pageUrl = ENFPY_WEB_URL[cur];
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
export const convertToScreenNameFromWebUrl = <T extends EnfpyWebPathnameType>(
  pathname: T
): ValueOfScreenName => {
  const screenName = removeSlash(pathname);
  return screenName === "" ? "root" : screenName;
};
