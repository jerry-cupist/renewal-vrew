import {
  PrimaryButton as _PrimaryButton,
  PrimaryButtonProps,
} from "@vrew/ui/button/PrimaryButton";

export const PrimaryButton = (props: PrimaryButtonProps) => {
  const { label, onClick } = props;
  return <_PrimaryButton label={label} onClick={onClick} color={"#8800FB"} />;
};
