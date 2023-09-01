import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

const authQueryKeys = {
  default: "auth" as const,
  getSession: () => [authQueryKeys.default, "session"] as const,
};

/**
 * TODO: GetSessionParams옵션 찾아보기
 * 
 * export type GetSessionParams = CtxOrReq & {
  event?: "storage" | "timer" | "hidden" | string
  triggerEvent?: boolean
  broadcast?: boolean
}
 */

/**
 * @note next-auth에서 제공하는 useSession가 session.update 이후 session이 동기화되지 않는 이슈가 있다.
 * 이 이유로 getSession를 사용한다.
 */
export const useSession = <T = Session | null>(
  options?: UseQueryOptions<
    Session | null,
    unknown,
    T,
    ReturnType<typeof authQueryKeys.getSession>
  >
) => useQuery(authQueryKeys.getSession(), () => getSession(), options);

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
