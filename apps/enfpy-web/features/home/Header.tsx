"use client";

import styled from "@emotion/styled";
import { useNavigation } from "@hooks/navigation/useNavigation";
import { Screens } from "@vrew/modules/web-bridge/constants/screen-enfpy";
import { Wrapper } from "@vrew/ui/layout/Wrapper";
import React from "react";

export const Header = () => {
  const navigation = useNavigation();
  const handlePressFavorSetting = () => {
    navigation.navigate(Screens.FAVOR_SETTING);
  };
  return (
    <Container>
      <Wrapper>
        <Inner>
          <p>ENFPY</p>
          <button onClick={handlePressFavorSetting}>선호설정</button>
        </Inner>
      </Wrapper>
    </Container>
  );
};

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

const Container = styled.div`
  background: pink;
  height: 44px;
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  z-index: 1;
`;
