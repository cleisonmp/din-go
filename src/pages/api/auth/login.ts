import type { NextApiRequest, NextApiResponse } from 'next'
import CryptoJS from 'crypto-js'
import { responseErrorHandler } from '../_lib/responseErrorHandler'
import { generateJwtAndRefreshToken } from '../../../lib/services/authentication/jwt'
import {
  getRole,
  getUserByEmailAndPassword,
} from '../../../lib/services/queries'

const Login = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return responseErrorHandler(response, 405, 'Method not allowed.')
  }

  const { email, password, userRefreshToken } = request.body
  console.log('body', request.body)

  if (!email || !password) {
    return responseErrorHandler(response, 400, 'Bad Request.')
  }

  const encryptedPass = CryptoJS.SHA3(password).toString(CryptoJS.enc.Base64)

  let name: string, role: string
  try {
    const user = await getUserByEmailAndPassword(email, encryptedPass)
    name = user.data.name
    role = user.data.role
  } catch (error) {
    return responseErrorHandler(response, 401, 'Invalid credentials.')
  }

  let permissions: string[]
  try {
    const userRole = await getRole(role)
    permissions = userRole.data.permissions
  } catch (error) {
    return responseErrorHandler(response, 401, `User role "${role}" not found.`)
  }

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
export default Login
