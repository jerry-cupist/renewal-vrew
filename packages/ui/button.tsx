"use client";

interface ButtonProps {
  label: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  radius?: "middle" | "full";
}

export function Button(props: ButtonProps): JSX.Element {
  const { label, leftIcon, rightIcon, radius } = props;
  return (
    <button onClick={(): void => alert("booped")} type="button">
      {label}
    </button>
  );
}
