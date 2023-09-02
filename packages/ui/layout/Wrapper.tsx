import styled from "@emotion/styled";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  padding: 0 16px;
`;
