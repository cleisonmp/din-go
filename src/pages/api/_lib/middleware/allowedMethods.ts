import { Middleware } from 'next-api-route-middleware'
import { ApiAuthError } from '../../../../lib/models/api/error'

export const allowMethods = (allowedMethods: string[]): Middleware => {
  return async (request, _response, next) => {
    if (request.method && allowedMethods.includes(request.method)) {
      await next()
    } else {
      throw new ApiAuthError('Method not allowed.', 405, 'method.invalid')
    }
  }
}
