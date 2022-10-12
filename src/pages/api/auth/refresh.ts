import type { NextApiResponse } from 'next'

import { withErrorHandler } from '@cleisonmp/next-api-route-middleware'

import { addUserInfo, allowMethods, errorHandler } from '../_lib/middleware'
import {
  checkRefreshTokenIsValid,
  generateJwtAndRefreshToken,
  getTokenEmail,
} from '../../../lib/services/authentication/jwt'
import { NextApiRequestWithUser } from '../../../lib/models/api'
import { ApiAuthError } from '../../../lib/models/api/error'

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
export default withErrorHandler({
  errorHandler: errorHandler,
  middlewares: [allowMethods(['POST']), addUserInfo(getTokenEmail), Refresh],
})
/*export default use(
  errorHandler,
  allowMethods(['POST']),
  addUserInfo(getTokenEmail),
  Refresh,
)
*/
