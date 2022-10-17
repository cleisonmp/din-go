import type { NextApiResponse } from 'next'

import { use } from 'next-api-route-middleware'

import {
  addUserInfo,
  allowMethods,
  errorHandler,
} from '../../../lib/services/api/middleware'
import { NextApiRequestWithUser } from '../../../lib/models/api'
import { verifyToken } from '../../../lib/services/authentication/jwt'

interface CheckPermissionResponse {
  email: string
  permissions: string[]
  role: string
}

const CheckPermission = async (
  request: NextApiRequestWithUser,
  response: NextApiResponse<CheckPermissionResponse>,
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
  allowMethods(['GET']),
  addUserInfo(verifyToken),
  CheckPermission,
)
