import { Middleware } from 'next-api-route-middleware'
import { ApiAuthError } from '../../../../lib/models/api/error'

export const errorHandler: Middleware = async (req, response, next) => {
  console.log('error instanceof ApiAuthError')
  try {
    await next()
  } catch (error) {
    console.log('================error================')
    console.error(error)
    console.log('================end================')

    if (error instanceof ApiAuthError) {
      console.log('error instanceof ApiAuthError')

      response.status(error.statusCode).json({
        errorCode: error.errorCode,
        message: error.message,
        stack: error.stack,
        cause: error.cause,
        name: error.name,
        statusCode: error.statusCode,
        //originalError: error.originalError,
      })
      response.end()
    } else {
      console.log('unknown error!', error)
      response.status(500).send({ message: 'Server unknown error!' })
    }
  }
}
