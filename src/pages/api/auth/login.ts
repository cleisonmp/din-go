import type { NextApiRequest, NextApiResponse } from 'next'
import CryptoJS from 'crypto-js'
import { generateJwtAndRefreshToken } from '../../../lib/services/authentication/jwt'
import { use } from 'next-api-route-middleware'

import {
  getRole,
  getUserByEmailAndPassword,
} from '../../../lib/services/queries'
import {
  allowMethods,
  errorHandler,
} from '../../../lib/services/api/middleware'
import { LoginResponse } from '../../../lib/models/api'
import { ApiAuthError } from '../../../lib/errors/ApiAuthError'

const Login = async (
  request: NextApiRequest,
  response: NextApiResponse<LoginResponse>,
) => {
  const { email, password, userRefreshToken } = request.body

  if (!email || !password) {
    throw new ApiAuthError('Invalid request body.', 400, 'request.invalid')
  }

  const encryptedPass = CryptoJS.SHA3(password).toString(CryptoJS.enc.Base64)

  const {
    data: { name, role },
  } = await getUserByEmailAndPassword(email, encryptedPass)

  const {
    data: { permissions },
  } = await getRole(role)

  const { token, refreshToken } = await generateJwtAndRefreshToken({
    email,
    payload: {
      permissions,
      role,
    },
    userRefreshToken,
  })

  return response.json({
    token,
    refreshToken,
    name,
    email,
    role,
    permissions,
  })
}

export default use(errorHandler, allowMethods(['POST']), Login)
