import { NextApiResponse } from 'next'

export const responseErrorHandler = (
  response: NextApiResponse,
  errorCode: number,
  errorMessage: string,
) => {
  return response.status(errorCode).json({
    error: true,
    message: errorMessage,
  })
}
