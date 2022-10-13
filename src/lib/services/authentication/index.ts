import Router from 'next/router'
import { BroadcastChannel } from 'broadcast-channel'

import { api } from '../api'
import { AxiosResponse } from 'axios'
import { ApiAuthError } from '../../errors/ApiAuthError'
import { LoginResponse } from '../../models/api'
import { deleteAuthCookies, storeAuthCookies } from './authCookies'

export const signOut = () => {
  const authChannel = new BroadcastChannel('authChannel')

  deleteAuthCookies()

  authChannel.postMessage('signOut')

  Router.push('/')
}

type SignInResponse = {
  name: string
  email: string
  role: string
  avatarUrl: string
}

export const signIn = async (
  email: string,
  password: string,
): Promise<SignInResponse> => {
  const authChannel = new BroadcastChannel('authChannel')

  const response = await api.post('auth/login', {
    email,
    password,
  })

  if (response.status !== 200) {
    throw new ApiAuthError(
      response.data.errorMessage,
      response.status,
      response.data.errorCode,
    )
  }

  const {
    data: { token, refreshToken, name, role },
  } = response as AxiosResponse<LoginResponse>

  storeAuthCookies(token, refreshToken)
  /*
  setCookie(undefined, 'nextauth.token', token, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })

  setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })*/

  authChannel.postMessage('signIn')

  return {
    name,
    email,
    role,
    avatarUrl: 'https://i.pravatar.cc/150',
  }
}
