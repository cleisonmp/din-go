import { Middleware } from 'next-api-route-middleware'
import { NextApiRequestWithUser } from '../../../../lib/models/api'
import { ApiAuthError } from '../../../../lib/models/api/error'
import { TokenContent } from '../../../../lib/services/authentication/jwt'
import { getRole, getUserByEmail } from '../../../../lib/services/queries'

export const addUserInfo = (
  tokenHandler: (authorizationToken: string) => TokenContent,
): Middleware<NextApiRequestWithUser> => {
  return async (request, response, next) => {
    const { authorization } = request.headers

    if (!authorization) {
      throw new ApiAuthError('Token not present.', 401, 'token.invalid')
    }

    const authorizationToken = authorization?.split(' ')[1]

    if (!authorizationToken) {
      throw new ApiAuthError('Token not present.', 401, 'token.invalid')
    }

    const { email } = tokenHandler(authorizationToken)

    const {
      data: { role },
    } = await getUserByEmail(email)

    const {
      data: { permissions },
    } = await getRole(role)

    request.user = { email, permissions, role }
    await next()
  }
}
