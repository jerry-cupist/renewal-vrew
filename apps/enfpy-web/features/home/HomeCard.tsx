"use client";

import { PrimaryButton } from "@components/button/PrimaryButton";
import styled from "@emotion/styled";
import { Wrapper } from "@vrew/ui/layout/Wrapper";

export interface HomeCardProps {
  nickname: string;
  age: number;
  distance: number;
  location: string;
  mbti: string;
  image: string;
}

export const HomeCard = (props: HomeCardProps) => {
  const handleRequestFriend = () => {};
  const handleDelete = () => {};
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
          <div className="buttonList">
            <PrimaryButton label="삭제" onClick={handleDelete} />
            <PrimaryButton label="친구 신청" onClick={handleRequestFriend} />
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

  .buttonList {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;

    button {
      width: calc(50% - 5px);
    }
  }
`;

const Information = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 12px 0 34px;
`;
