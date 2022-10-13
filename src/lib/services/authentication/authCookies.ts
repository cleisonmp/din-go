import { NextPageContext } from 'next'
import nookies, { destroyCookie, parseCookies, setCookie } from 'nookies'

export const storeAuthCookies = (
  token: string,
  refreshToken: string,
  ctx?: Pick<NextPageContext, 'res'>,
) => {
  const isServer = typeof window === 'undefined'

  if (isServer) {
    nookies.set(ctx, 'nextauth.token', token, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
    nookies.set(ctx, 'nextauth.refreshToken', refreshToken, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
  } else {
    setCookie(ctx, 'nextauth.token', token, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })

    setCookie(ctx, 'nextauth.refreshToken', refreshToken, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
  }
}

export const deleteAuthCookies = (ctx?: Pick<NextPageContext, 'res'>) => {
  const isServer = typeof window === 'undefined'

  if (isServer) {
    nookies.destroy(ctx, 'nextauth.token')
    nookies.destroy(ctx, 'nextauth.refreshToken')
  } else {
    destroyCookie(ctx, 'nextauth.token')
    destroyCookie(ctx, 'nextauth.refreshToken')
  }
}

export const getAuthCookies = (ctx?: Pick<NextPageContext, 'req'>) => {
  const cookies = parseCookies(ctx)
  const token = cookies['nextauth.token']
  const refreshToken = cookies['nextauth.refreshToken']

  return {
    token,
    refreshToken,
  }
}
