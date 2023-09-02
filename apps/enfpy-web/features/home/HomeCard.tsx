"use client";

import styled from "@emotion/styled";
import { Wrapper } from "@vrew/ui/layout/Wrapper";
import Image from "next/image";

export interface HomeCardProps {
  nickname: string;
  age: number;
  distance: number;
  location: string;
  mbti: string;
  image: string;
}

export const HomeCard = (props: HomeCardProps) => {
  return (
    <Container>
      <img src={props.image} alt="" />

      <Information>
        <Wrapper>
          <div>
            <p>
              {props.nickname}, {props.age}
            </p>
            <p>
              {props.distance.toFixed(1)}km · {props.location}
            </p>
          </div>
          <div>
            <p>{props.mbti}</p>
            <p>더 보기</p>
          </div>
          <div>
            <button>닫기</button>
            <button>친구 신청</button>
          </div>
        </Wrapper>
      </Information>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Information = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 12px 0 34px;
`;
