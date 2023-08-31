import { PostSignInResponse } from "@vrew/apis/enfpy/auth";
import { GetProfileResponse } from "@vrew/apis/enfpy/user";
import NextAuth, { AuthOptions, User } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import ENPFY_URL from "../../../../constant/url";
import enfpyApiClient from "../../../../apis";
import { AxiosError } from "axios";

/**
 * All requests to /api/auth/*(signIn, callback, signOut, etc.)
 * will automatically be handled by NextAuth.js.
 */

const SECOND = 1;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

/**
 * refreshToken-due: 약 4개월
 */
const SESSION_MAX_AGE = 30 * DAY;

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

        const { data: signInResponse } = await enfpyApiClient.auth.postSignIn({
          loginAccountIdentification,
          phoneVerificationCode,
          phoneVerificationId: parseInt(phoneVerificationId),
        });

        const token = signInResponse.data;

        const { data: profileResponse } = await enfpyApiClient.user.getProfile(
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

        const response = await enfpyApiClient.auth
          .silentRefresh(refreshToken)
          .catch((error: AxiosError) => {
            const response = error?.response;
            const errorMessage =
              (error?.response?.data as any)?.content?.type ||
              "네트워크 에러 발생";
            const status = response?.status;

            throw new Error(`[${status}] ${errorMessage}`);
          });
        const token = response.data.data;

        const { data: profileResponse } = await enfpyApiClient.user.getProfile(
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
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: SESSION_MAX_AGE,
  },
  /** @see https://next-auth.js.org/configuration/options#jwt */
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: SESSION_MAX_AGE,
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
     * jwt에서 반환된 token은 session콜백에 전달됩니다.
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
    /**
     * Send properties to the client, like an access_token and user id from a provider.
     */
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

  /**
   * @note The execution of your authentication API will be blocked by an await on your event handler.
   * If your event handler starts any burdensome work it should not block its own promise on that work.
   */
  events: {
    async signIn({ user }) {
      const token = user.token;
      enfpyApiClient.updateToken(token.accessToken);
    },
    /* on signout */
    async signOut(message) {
      enfpyApiClient.deleteToken();
    },
    async createUser(message) {
      /* user created */
    },
    async updateUser(message) {
      /* user updated - e.g. their email was verified */
    },
    async session(message) {
      /* session is active */
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
