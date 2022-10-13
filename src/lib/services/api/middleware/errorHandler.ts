import { Middleware } from 'next-api-route-middleware'
import { ApiAuthError } from '../../../errors/ApiAuthError'

export const errorHandler: Middleware = async (req, response, next) => {
  try {
    await next()
  } catch (error) {
    if (error instanceof ApiAuthError) {
      if (process.env.API_ERROR_TYPE === 'LONG') {
        response.status(error.statusCode).json({
          errorCode: error.errorCode,
          message: error.message,
          stack: error.stack,
          cause: error.cause,
          name: error.name,
          statusCode: error.statusCode,
        })
      } else {
        response.status(error.statusCode).json({
          errorCode: error.errorCode,
          message: error.message,
          statusCode: error.statusCode,
        })
      }
    } else {
      console.log('unknown error!', error)
      response.status(500).send({ message: 'Server unknown error!' })
    }
  }
}
