"use client";

import { PropsWithChildren, useEffect } from "react";

interface Token {
  accessToken: string;
  refreshToken: string;
  //   accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNDI2IiwidXNlckRldmljZUlkIjoiMzAyMyIsInByb2ZpbGVJZCI6IjI0MjYiLCJzZXJ2aWNlTmFtZSI6ImVuZnB5IiwiaWF0IjoxNjkzMjA0NDM5LCJleHAiOjE2OTU3OTY0Mzl9.Q5D8IEJq0HsjXnBPH8lSZEuoP9s3scxqzQHbZVPLQbM";
  //   refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNDI2IiwidXNlckRldmljZUlkIjoiMzAyMyIsInByb2ZpbGVJZCI6IjI0MjYiLCJzZXJ2aWNlTmFtZSI6ImVuZnB5IiwiaWF0IjoxNjkzMjA0NDM5LCJleHAiOjE3MDM1NzI0Mzl9.m7y0Nh0OU-99itPvc5Hq6pUSd2u0kpmRPm5OaiD8pjw";
}

/**
 * 자동 로그인
 */
const useAutoLogin = () => {
  useEffect(() => {
    const jsonString = localStorage.getItem("token") || "";
    const token: Token = JSON.parse(jsonString) || {};

    // 1. accessToken으로 로그인요청
    // 2.

    console.log({ token });
  }, []);
};

const SessionContext = ({ children }: PropsWithChildren) => {
  useAutoLogin();

  return <div>{children}</div>;
};

export default SessionContext;
