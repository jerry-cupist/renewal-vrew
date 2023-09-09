import {
  inferQueryKeyStore,
  mergeQueryKeys,
} from '@lukemorales/query-key-factory'
import { authKeys } from './auth'

/**
 * @see https://www.npmjs.com/package/@lukemorales/query-key-factory
 */
export const queries = mergeQueryKeys(authKeys)

export type QueryKeys = inferQueryKeyStore<typeof queries>
