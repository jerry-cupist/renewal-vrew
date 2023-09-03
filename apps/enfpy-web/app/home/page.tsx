"use client";

import enfpyApiClient from "@apis/index";
import styled from "@emotion/styled";
import { Header } from "@features/home/Header";
import { HomeCard, HomeCardProps } from "@features/home/HomeCard";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const SwiperWrapper = styled(Swiper)`
  width: 100%;
  height: 100%;
  background: yellowgreen;
`;

export default function Page(): JSX.Element {
  const [queryClient] = useState(() => new QueryClient());

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["article", "1"],
    queryFn: enfpyApiClient.recommendation.getNewRecommendation,
  });

  const {
    data: data2,
    isLoading: isl,
    isError: isr,
    refetch: ref,
  } = useQuery({
    queryKey: ["article", "2"],
    queryFn: enfpyApiClient.recommendation.getNewRecommendation,
  });

  const invalidate = () => {
    console.log("alert");
    queryClient.refetchQueries({ queryKey: ["article"] });
  };

  console.log(data2);

  if (isLoading) {
    return <>"로딩중"</>;
  }

  if (isError) {
    return <>"에러남"</>;
  }

  return (
    <Container>
      <Header />
      <button onClick={invalidate}>invalidate</button>
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
