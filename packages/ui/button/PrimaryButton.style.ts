import styled from "@emotion/styled";

export const Container = styled.button<{
  color?: string;
  radiusType?: "middle" | "full";
}>`
  padding: 11px 16px;
  background: ${(props) => props.color || "red"};
  border-radius: ${(props) =>
    props.radiusType === "middle"
      ? "8px"
      : props.radiusType === "full"
      ? "99px"
      : "4px"};
  font-size: 18px;
  width: 100%;
  color: white;
  font-weight: 600;
  border: 0;
`;
