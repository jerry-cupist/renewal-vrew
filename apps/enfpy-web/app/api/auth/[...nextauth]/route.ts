import { PostSignInResponse } from "@vrew/apis/enfpy/auth";
import { GetProfileResponse } from "@vrew/apis/enfpy/user";
import NextAuth, { AuthOptions, User } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import ENPFY_URL from "../../../../constant/url";
import enfpyApiUtil from "../../../../apis";

/**
 * All requests to /api/auth/*(signIn, callback, signOut, etc.)
 * will automatically be handled by NextAuth.js.
 */

/**
 * next-auth 로그인 반환 사용자 정보
 */
export interface NextAuthUser extends User {
  token: PostSignInResponse["data"];
  userInfo: GetProfileResponse["data"];
  meta: GetProfileResponse["meta"];
}

export enum CREDENTIALS_TYPE {
  TELEPHONE = "telephone-login",
  TOKEN = "token-login",
}

/**
 * @see https://next-auth.js.org/providers/credentials#multiple-providers
 */
export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    /**
     * [CASE] 휴대폰 로그인
     */
    CredentialsProvider({
      id: CREDENTIALS_TYPE.TELEPHONE,
      name: CREDENTIALS_TYPE.TELEPHONE,

      credentials: {
        phoneVerificationId: {
          label: "핸드폰 인증 아이디",
          type: "text",
        },
        phoneVerificationCode: { label: "인증번호", type: "text" },
        loginAccountIdentification: { label: "계정 증명", type: "text" },
      },
      async authorize(credentials, req) {
        if (!req.query) {
          throw new Error("로그인 요청 정보가 잘못됐습니다");
        }

        const {
          loginAccountIdentification,
          phoneVerificationCode,
          phoneVerificationId,
        } = req.query;

        const { data: signInResponse } = await enfpyApiUtil.auth.postSignIn({
          loginAccountIdentification,
          phoneVerificationCode,
          phoneVerificationId: parseInt(phoneVerificationId),
        });

        const token = signInResponse.data;

        const { data: profileResponse } = await enfpyApiUtil.user.getProfile(
          "me",
          {
            headers: {
              Authorization: `bearer ${token.accessToken}`,
            },
          }
        );

        const user: NextAuthUser = {
          id: profileResponse.data.profile.id.toString(),
          userInfo: profileResponse.data,
          token,
          meta: profileResponse.meta,
        };

        return user;
      },
    }),
    /**
     * [CASE] Silent refresh, refreshToken을 이용한 자동 로그인
     */
    CredentialsProvider({
      id: CREDENTIALS_TYPE.TOKEN,
      name: CREDENTIALS_TYPE.TOKEN,

      credentials: {
        refreshToken: { label: "refreshToken" },
      },
      async authorize(credentials, req) {
        const refreshToken = req.query?.refreshToken;

        if (!refreshToken) {
          throw new Error("refreshToken이 존재하지 않습니다.");
        }

        const { data: res } = await enfpyApiUtil.auth.silentRefresh(
          refreshToken
        );
        const token = res.data;

        const { data: profileResponse } = await enfpyApiUtil.user.getProfile(
          "me",
          {
            headers: {
              Authorization: `bearer ${token.accessToken}`,
            },
          }
        );

        const user: NextAuthUser = {
          id: profileResponse.data.profile.id.toString(),
          userInfo: profileResponse.data,
          token,
          meta: profileResponse.meta,
        };

        return user;
      },
    }),
  ],
  pages: {
    signIn: ENPFY_URL.ROOT,
    signOut: ENPFY_URL.ROOT,
    error: ENPFY_URL.LOGIN,
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 2 * 24 * 60 * 60,
  },
  callbacks: {
    /**
     * @see https://next-auth.js.org/configuration/callbacks#sign-in-callback
     */
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;

      // Return false to display a default error message Or you can return a URL to redirect to:
      // return '/unauthorized'
      return isAllowedToSignIn;
    },

    /**
     * @see https://next-auth.js.org/getting-started/example#extensibility
     */
    async jwt({ token, user, account, profile }) {
      if (user?.token) {
        token.accessToken = user.token.accessToken;
        token.refreshToken = user.token.refreshToken;
        token.user = user.userInfo.user;
      }
      return token;
    },
    async session({ session, user, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.user = token.user;
      }

      return session;
    },

    /**
     * 보안을 위해 cross origin 확인
     */
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
