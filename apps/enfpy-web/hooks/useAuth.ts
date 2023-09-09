'use client'
import { useNavigation } from './navigation/useNavigation'
import {
  useSession,
  useSignIn,
  useSignOut,
  useSilentRefresh,
} from './queries/auth'
import { useQueryClient } from '@tanstack/react-query'
import tokenManager from '../utils/tokenUtil'

const useAuth = () => {
  const navigation = useNavigation()
  const session = useSession()
  const isSignIn = Boolean(session.data?.expires)
  const queryClient = useQueryClient()
  const signOut = useSignOut({
    onMutate: () => {
      queryClient.clear()
      tokenManager.delete()
    },
    onSuccess: (data, variables) => {
      session.refetch()

      if (variables.callbackUrl) {
        navigation.navigate(variables.callbackUrl)
      }
    },
  })

  const signIn = useSignIn({
    onSuccess: () => {
      session.refetch()
    },
  })

  const _silentRefresh = useSilentRefresh({
    onSuccess: () => {
      session.refetch()
    },
  })

  return {
    isSignIn,
    signIn: signIn.mutateAsync,
    signOut: signOut.mutateAsync,
    silentRefresh: _silentRefresh.mutateAsync,
    isLoading: session.isLoading,
    isRefetching: session.isRefetching,
  }
}

export default useAuth
