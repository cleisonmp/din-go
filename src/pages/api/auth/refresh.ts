import type { NextApiRequest, NextApiResponse } from 'next'
import jwtDecode from 'jwt-decode'

import { responseErrorHandler } from '../_lib/responseErrorHandler'
import { DecodedToken } from '../../../lib/models/api/api'
import { getRole, getUserByEmail } from '../../../lib/services/queries'
import {
  checkRefreshTokenIsValid,
  generateJwtAndRefreshToken,
} from '../../../lib/services/authentication/jwt'

const getTokenEmail = (authorizationToken: string) => {
  const tokenData = jwtDecode(authorizationToken) as DecodedToken
  console.log(tokenData)

  return tokenData.sub
}

const Refresh = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return responseErrorHandler(response, 405, 'Method not allowed.')
  }

  const { refreshToken } = request.body

  if (!refreshToken) {
    return response
      .status(401)
      .json({ error: true, message: 'Refresh token is required.' })
  }

  const { authorization } = request.headers

  if (!authorization) {
    return response.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Token not present.',
    })
  }

  const authorizationToken = authorization?.split(' ')[1]

  if (!authorizationToken) {
    return response.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Token not present.',
    })
  }

  let email: string
  try {
    email = getTokenEmail(authorizationToken) ?? ''
  } catch (error) {
    return response.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Invalid token format.',
    })
  }
  console.log('email', email)

  let role: string
  try {
    const userInfo = await getUserByEmail(email)
    role = userInfo.data.role
  } catch (error) {
    return response.status(401).json({
      error: true,
      message: 'User not found.',
    })
  }
  console.log('role', role)

  let permissions: string[]
  try {
    const userRole = await getRole(role)
    permissions = userRole.data.permissions
  } catch (error) {
    return responseErrorHandler(response, 401, `User role "${role}" not found.`)
  }

  try {
    if (!(await checkRefreshTokenIsValid(email, refreshToken))) {
      throw new Error()
    }
  } catch (error) {
    return response
      .status(401)
      .json({ error: true, message: 'Refresh token is invalid.' })
  }

  //invalidateRefreshToken(email, refreshToken)

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

export default Refresh
