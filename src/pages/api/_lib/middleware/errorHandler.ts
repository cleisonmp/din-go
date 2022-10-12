import { NextApiResponse } from 'next'
import { ApiAuthError } from '../../../../lib/models/api/error'

export const errorHandler = async (
  response: NextApiResponse,
  error: unknown,
) => {
  if (error instanceof ApiAuthError) {
    response.status(error.statusCode).json({
      errorCode: error.errorCode,
      errorMessage: error.message,
    })
  } else {
    response.status(500).send({ message: 'Server unknown error!' })
  }
}
