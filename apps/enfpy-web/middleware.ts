import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import {
  ScreenPaths,
  Screens,
} from "@vrew/modules/web-bridge/constants/screen-enfpy";

/**
 * 페이지 접근 권한을 확인하고 리다이랙션한다.
 *
 * @see https://next-auth.js.org/configuration/nextjs#middleware
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 */

interface WithAuthRequestParams {
  req: NextRequest;
  accessToken?: string;
}

/**
 * 인증이 필요한 페이지
 * 로그인하지 않은 경우 로그인 페이지로 리다이랙션
 * e.g 로그인 페이지 (로그인 한 다음에 접근이 불가능해야 함)
 */
const withAuthRequest = (params: WithAuthRequestParams) => {
  const { req, accessToken } = params;
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;
  const isSignIn = Boolean(accessToken);

  if (!isSignIn) {
    url.pathname = ScreenPaths[Screens.LOGIN];
    url.search = `callbackUrl=${pathname}`;

    return NextResponse.redirect(url);
  }

  return null;
};

interface WithOutAuthRequestParams {
  req: NextRequest;
  accessToken?: string;
  redirectUrl?: string;
}

/**
 * 로그인 사용자가 접근하면 안되는 페이지에 접근한 경우 리다이랙션
 * e.g 마이페이지 (로그인 해야만 접근 가능함)
 */
const withOutAuthRequest = (params: WithOutAuthRequestParams) => {
  const { req, accessToken, redirectUrl = ScreenPaths[Screens.ROOT] } = params;
  const url = req.nextUrl.clone();
  const isSignIn = Boolean(accessToken);

  if (isSignIn) {
    url.pathname = redirectUrl;
    url.search = "";

    return NextResponse.redirect(url);
  }

  return null;
};

/**
 * 인증이 필요한 경로
 */
const withAuthList: string[] = [ScreenPaths[Screens.PROFILE]];
/**
 * 인증한 사용자가 접근할 수 없는 경로
 * e.g. 회원가입, 로그인
 */
const withOutAuthList: string[] = [ScreenPaths[Screens.LOGIN]];

const isWithAuth = (pathname: string) => withAuthList.includes(pathname);
const isWithOutAuth = (pathname: string) => withOutAuthList.includes(pathname);

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {
    // 서버사이드에서 로그인 유무를 판단할 수 있는 next-auth 제공 함수
    // 토큰 값이 falsy 하지 않으면 로그인
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // 사용자가 요청하는 페이지 pathname
    const { pathname } = req.nextUrl;

    if (isWithAuth(pathname)) {
      return withAuthRequest({ req, accessToken: token?.accessToken });
    } else if (isWithOutAuth(pathname)) {
      return withOutAuthRequest({ req, accessToken: token?.accessToken });
    }

    return null;
  },
  {
    callbacks: {
      /**
       * admin | guest | user 등 세분화된 권한이 존재하는 경우
       */
      authorized: ({ token }) => true, //token?.role === "admin",
    },
  }
);

/**
 * 미들웨어가 실행될 특정 pathname을 지정하면, 해당 pathname에서만 동작함
 */
export const config = {
  mathcher: [...withAuthList, ...withOutAuthList],
};
