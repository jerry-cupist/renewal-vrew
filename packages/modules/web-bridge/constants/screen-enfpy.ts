export const ScreenName = {
  Main: "main",
  Sub: "sub",
} as const;

export type TypeOfScreenName = typeof ScreenName;
export type ValueOfScreenName = TypeOfScreenName[keyof TypeOfScreenName];