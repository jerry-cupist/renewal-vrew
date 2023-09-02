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
    <Wrapper>
      <Container>
        <p>ENFPY</p>
        <button onClick={handlePressFavorSetting}>선호설정</button>
      </Container>
    </Wrapper>
  );
};

const Container = styled.div`
  background: pink;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  z-index: 1;
`;
