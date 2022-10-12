import { ReactNode, useEffect } from 'react'
import Router from 'next/router'
import { BroadcastChannel } from 'broadcast-channel'

import { signOut } from '../../lib/services/authentication'
import { useLoggedInUserData } from './LoggedInUserData'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = useLoggedInUserData((state) => state.isAuthenticated)
  const clearUser = useLoggedInUserData((state) => state.clearUser)

  useEffect(() => {
    console.log('token isAuthenticated?', isAuthenticated)
    if (isAuthenticated) {
      Router.push('/dashboard')
    }
  }, [isAuthenticated])

  useEffect(() => {
    const authChannel = new BroadcastChannel('authChannel')

    authChannel.onmessage = (message) => {
      switch (message) {
        case 'signOut':
          signOut()
          clearUser()
          authChannel.close()
          break
        case 'signIn':
          //console.log('authChannel signIn')
          //Router.push('/dashboard')
          break
        default:
          break
      }
    }
  }, [clearUser])

  return <>{children}</>
}
