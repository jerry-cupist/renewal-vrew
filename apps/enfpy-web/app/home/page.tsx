"use client";

import enfpyApiClient from "@apis/index";
import styled from "@emotion/styled";
import { Header } from "@features/home/Header";
import { HomeCard } from "@features/home/HomeCard";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";

const SwiperWrapper = styled(Swiper)`
  width: 100%;
  height: 100%;
  background: yellowgreen;
`;

export default function Page(): JSX.Element {
  const { data, isLoading } = useQuery({
    queryKey: ["uniqueQueryKey"],
    queryFn: enfpyApiClient.recommendation.getNewRecommendation,
  });

  if (isLoading) {
    return <>"로딩중"</>;
  }

  return (
    <Container>
      <Header />
      <SwiperWrapper
        direction="vertical"
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {data?.map((item) => {
          return (
            <SwiperSlide>
              <HomeCard {...item} />
            </SwiperSlide>
          );
        })}
      </SwiperWrapper>
    </Container>
  );
}

const Container = styled.div`
  background-color: yellow;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  user-select: none;
`;
