export const ENFPY_WEB_URL = {
  ROOT: "/",
  LOGIN: "/login",
  PROFILE: "/profile",
  MAIN: "/main",
  MAIN_MBTI: "/main/mbti",
  SUB: "/sub",
} as const;

export type EnfpyWebUrlType = typeof ENFPY_WEB_URL;
export type EnfpyPathnameType = keyof EnfpyWebUrlType;
export type EnfpyWebPathnameType = EnfpyWebUrlType[EnfpyPathnameType];
