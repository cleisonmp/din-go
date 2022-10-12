import type { NextApiResponse } from 'next'

import { use } from 'next-api-route-middleware'

import { addUserInfo, allowMethods, errorHandler } from '../_lib/middleware'
import { NextApiRequestWithUser } from '../../../lib/models/api'
import { verifyToken } from '../../../lib/services/authentication/jwt'

//TODO Type CheckPermission response
const CheckPermission = async (
  request: NextApiRequestWithUser,
  response: NextApiResponse,
) => {
  const { email, permissions, role } = request.user

  return response.json({
    email,
    permissions,
    role,
  })
}
export default use(
  errorHandler,
  allowMethods(['POST']),
  addUserInfo(verifyToken),
  CheckPermission,
)