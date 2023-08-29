export interface PersonalityTest {
  id: number;
  name: string;
  title: string;
  linkSelf: string;
  linkTarget: string;
  linkMarketing: string;
  state: "activate" | "inactivate";
  adminId: number;
  notificationInAppMessage: string | null;
  notificationInAppStartAt: string | null;
  notificationInAppEndAt: string | null;
  notificationInAppImagePath: string | null;
  notificationPushMessage: string | null;
  notificationPushStartAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PersonalityTestDetail {
  id: number;
  personalityTestId: number;
  name: string;
  title: string;
  subtitle: string;
  backgroundColorCode: string;
  fontColorCode: string;
  imagePath: string;
  linkSelf: string;
  linkTarget: string;
  createdAt: Date;
  updatedAt: Date;
}
