import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Session } from "next-auth";
import { getSession as _getSession } from "next-auth/react";
import tokenUtil from "../../utils/tokenUtil";

export const authKeys = {
  default: "auth" as const,
  getSession: () => [authKeys.default, "session"] as const,
};

export const getSession = () =>
  _getSession().then((session) => {
    if (session?.refreshToken) {
      tokenUtil.update(session.refreshToken);
    }
    return session;
  });

/**
 * @note next-auth에서 제공하는 useSession가 session.update 이후 session이 동기화되지 않는 이슈가 있다.
 * 이 이유로 getSession를 사용한다.
 */
export const useSession = <T = Session | null>(
  options?: UseQueryOptions<
    Session | null,
    unknown,
    T,
    ReturnType<typeof authKeys.getSession>
  >
) => useQuery(authKeys.getSession(), getSession, { ...options });

/**
 * 토큰 조회
 */
export const useToken = () =>
  useSession({
    select: (session) => {
      if (!session) {
        return null;
      }
      return {
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
      };
    },
  });
