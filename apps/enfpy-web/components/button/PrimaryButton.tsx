import {
  PrimaryButton as _PrimaryButton,
  PrimaryButtonProps,
} from "@vrew/ui/button/PrimaryButton";
import { EnfpyColors } from "@vrew/ui/color/enfpy";

export const PrimaryButton = (props: PrimaryButtonProps) => {
  return <_PrimaryButton {...props} color={EnfpyColors.primary.EnfpyPurple} />;
};
