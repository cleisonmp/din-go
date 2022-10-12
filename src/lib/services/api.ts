import axios, { AxiosError } from 'axios'
//import { parseCookies } from 'nookies'

export const api = axios.create({
  baseURL: '/api/',
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    console.log('interceptors:', error)
    /*if (error?.response?.status === 401) {
      if (error.response.data?.code === 'token.expired') {
        console.log('interceptors:', 'token.expired')
      }
    }*/
    return error.response
  },

  /*return Promise.reject(error)
  },*/
)

/*
if (error?.response?.status === 401) {
      if (error.response.data?.code === 'token.expired') {
        cookies = parseCookies(ctx)

        const { 'nextauth.refreshToken': refreshToken } = cookies
        const originalConfig = error.config

        if (!isRefreshing) {
          isRefreshing = true

          api
            .post('/refresh', {
              refreshToken,
            })
            .then((response) => {
              const { token } = response.data

              setCookie(ctx, 'nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
              })

              setCookie(
                ctx,
                'nextauth.refreshToken',
                response.data.refreshToken,
                {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: '/',
                },
              )

              api.defaults.headers['Authorization'] = `Bearer ${token}`

              failedRequestsQueue.forEach((request) => request.onSuccess(token))
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
              originalConfig.headers['Authorization'] = `Bearer ${token}`

              resolve(api(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            },
          })
        })
    } else {
      if (process.browser) {
        signOut()
      } else {
        return Promise.reject(new AuthTokenError())
      }
    }
*/
