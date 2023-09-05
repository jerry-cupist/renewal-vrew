import { GetProfileResponse } from '@vrew/apis/enfpy/user'
import NextAuth, { DefaultSession } from 'next-auth'

/**
 * @see https://next-auth.js.org/getting-started/typescript
 */
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      // address: string;
    } & DefaultSession['user'] &
      GetProfileResponse['data']['user']
    accessToken: string
    refreshToken: string
  }

  interface User {
    token: {
      accessToken: string
      refreshToken: string
    }
    userInfo: GetProfileResponse['data']
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken: string
    refreshToken: string
    user: GetProfileResponse['data']['user']
  }
}
