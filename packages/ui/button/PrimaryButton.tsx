"use client";

import React from "react";
import { Container } from "./PrimaryButton.style";

export interface PrimaryButtonProps {
  label: string;
  prefixIconElement?: React.ReactNode;
  postfixIconElement?: React.ReactNode;
  radiusType?: "middle" | "full";
  onClick: () => void;
  color?: string;
}

export const PrimaryButton = (props: PrimaryButtonProps) => {
  const {
    label,
    prefixIconElement,
    postfixIconElement,
    radiusType,
    onClick,
    color,
  } = props;

  return (
    <Container
      color={color}
      radiusType={radiusType}
      onClick={onClick}
      type="button"
    >
      {prefixIconElement}
      {label}
      {postfixIconElement}
    </Container>
  );
};
