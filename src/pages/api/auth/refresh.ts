import type { NextApiResponse } from 'next'

import { use } from 'next-api-route-middleware'

import {
  addUserInfo,
  allowMethods,
  errorHandler,
} from '../../../lib/services/api/middleware'
import {
  checkRefreshTokenIsValid,
  generateJwtAndRefreshToken,
  getTokenEmail,
} from '../../../lib/services/authentication/jwt'
import { NextApiRequestWithUser } from '../../../lib/models/api'
import { ApiAuthError } from '../../../lib/errors/ApiAuthError'

//TODO Type Refresh response
const Refresh = async (
  request: NextApiRequestWithUser,
  response: NextApiResponse,
) => {
  const { email, permissions, role } = request.user

  const { refreshToken } = request.body

  if (!refreshToken) {
    throw new ApiAuthError(
      'Refresh token is required.',
      401,
      'refreshToken.notFound',
    )
  }

  if (!(await checkRefreshTokenIsValid(email, refreshToken))) {
    throw new ApiAuthError('Refresh token is invalid.', 401, 'token.invalid')
  }

  const { token, refreshToken: newRefreshToken } =
    await generateJwtAndRefreshToken({
      email,
      payload: {
        permissions,
        role,
      },
      userRefreshToken: refreshToken,
    })

  return response.json({
    token,
    refreshToken: newRefreshToken,
    permissions,
    role,
  })
}
export default use(
  errorHandler,
  allowMethods(['POST']),
  addUserInfo(getTokenEmail),
  Refresh,
)
