"use client";

import React from "react";
import styled from "@emotion/styled";

export interface PrimaryButtonProps {
  label: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  radius?: "middle" | "full";
  onClick: () => void;
  color?: string;
}

export const PrimaryButton = (props: PrimaryButtonProps) => {
  const { label, leftIcon, rightIcon, radius, onClick, color } = props;

  const Container = styled.button`
    padding: 11px 16px;
    background: ${(props) => props.color || "red"};
    border-radius: ${radius === "middle" ? 8 : radius === "full" ? 99 : 4}px;
    font-size: 18px;
    width: 100%;
    color: white;
    font-weight: 600;
  `;

  return (
    <Container onClick={onClick} type="button" color={color}>
      {leftIcon}
      {label}
      {rightIcon}
    </Container>
  );
};
