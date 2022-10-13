import axios, { AxiosError } from 'axios'
import { GetServerSidePropsContext } from 'next'
//import { parseCookies } from 'nookies'
import { ApiAuthError } from '../../errors'
import { signOut } from '../authentication'
import { getAuthCookies, storeAuthCookies } from '../authentication/authCookies'

interface FailedRequestProps {
  onSuccess: (token: string) => void
  onFailure: (err: AxiosError) => void
}

let isRefreshing = false
let failedRequestsQueue: FailedRequestProps[] = []

export function setupAPIClient(ctx?: GetServerSidePropsContext) {
  const isServer = typeof window === 'undefined'

  let cookies = getAuthCookies(ctx) //parseCookies(ctx)

  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_URL}/api/`,
    headers: {
      Authorization: `Bearer ${cookies.token}`, //`Bearer ${cookies['nextauth.token']}`,
    },
  })

  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError<ApiAuthError>) => {
      if (error?.response?.status === 401) {
        if (error.response.data?.errorCode === 'token.expired') {
          //cookies = parseCookies(ctx)
          cookies = getAuthCookies(ctx)

          //const { refreshToken } = cookies
          const originalConfig = error.config

          if (!isRefreshing) {
            isRefreshing = true

            if (!cookies.refreshToken) {
              //
              return Promise.reject(
                new ApiAuthError(
                  'Refresh token is required',
                  401,
                  'refreshToken.notFound',
                ),
              )
            }
            api
              .post('auth/refresh', {
                refreshToken: cookies.refreshToken,
              })
              .then((response) => {
                const { token, refreshToken } = response.data

                storeAuthCookies(token, refreshToken, ctx)

                api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                failedRequestsQueue.forEach((request) =>
                  request.onSuccess(token),
                )
                failedRequestsQueue = []
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request) => request.onFailure(err))
                failedRequestsQueue = []

                if (process.browser) {
                  signOut()
                }
              })
              .finally(() => {
                isRefreshing = false
              })
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                if (originalConfig.headers) {
                  originalConfig.headers['Authorization'] = `Bearer ${token}`
                }
                resolve(api(originalConfig))
              },
              onFailure: (err: AxiosError) => {
                reject(err)
              },
            })
          })
        } else {
          if (isServer) {
            const { message, statusCode, errorCode } = error.response.data
            return Promise.reject(
              new ApiAuthError(message, statusCode, errorCode),
            )
          } else {
            signOut()
          }
        }
      }

      return Promise.reject(error)
    },
  )

  return api
}
