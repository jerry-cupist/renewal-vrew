/**
 * 스크린 이름을 location.pathName으로 정한다.
 * WEB URL과 통합관리
 */
export const ScreenName = {
  Root: "root",
  Main: "main",
  Sub: "sub",

  HomeTabScreen: "home",
  Login: "login",
  Profile: "profile",
  ProfileMbti: "profile/mbti",

  /**
   * Profile
   */
  // ReactProfileEditScreen: 'profile/edit',
  // EditProfileImageScreen: 'profile/profileImage/edit',
  // RequireProfileImageScreen: 'profile/profileImage/require',
  // UploadProfileImageScreen: 'profile/profileImage/upload',
  // IntroductionEditScreen: 'profile/edit/introduction',
  // TagEditScreen: 'profile/edit/tag',
  // MyPageProfilePropertyWebViewScreen: 'profile/edit/sub',
  // MyPageProfileEditScreen: 'my-page/profile/edit',
} as const;

export type TypeOfScreenName = typeof ScreenName;
export type ValueOfScreenName = TypeOfScreenName[keyof TypeOfScreenName];
