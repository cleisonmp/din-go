import type { NextApiRequest, NextApiResponse } from 'next'
import CryptoJS from 'crypto-js'
import { generateJwtAndRefreshToken } from '../../../lib/services/authentication/jwt'
import { use } from 'next-api-route-middleware'

import { getRole, getUserByEmail } from '../../../lib/services/queries'
import { allowMethods, errorHandler } from '../_lib/middleware'
import { LoginResponse } from '../../../lib/models/api'
import { ApiAuthError } from '../../../lib/models/api/error'

const loginEmail = async (
  request: NextApiRequest,
  response: NextApiResponse<LoginResponse>,
) => {
  const { email, password, userRefreshToken } = request.body
  console.log('body', request.body)

  if (!email || !password) {
    throw new ApiAuthError('Invalid request body.', 400, 'request.invalid')
  }

  const encryptedPass = CryptoJS.SHA3(password).toString(CryptoJS.enc.Base64)

  console.log('0')
  console.log('process.env.FAUNADB_KEY', process.env.FAUNADB_KEY)
  console.log('email', email)

  console.log('encryptedPass', encryptedPass)

  const {
    data: { name, role },
  } = await getUserByEmail(email)

  console.log('1')

  /*.then((response) => {
      console.log('responseresponseresponseresponse', response)

      if (response.status !== 200) {
        console.log('=======asdasdasdasdasd again')

        throw new ApiAuthError(
          'Invalid credentials.',
          401,
          'credentials.invalid',
        )
      }
    })
    .catch(() => {
      console.log('=======error again')

      throw new ApiAuthError('Invalid credentials.', 401, 'credentials.invalid')
    })*/

  const {
    data: { permissions },
  } = await getRole(role)
  console.log('2')

  const { token, refreshToken } = await generateJwtAndRefreshToken({
    email,
    payload: {
      permissions,
      role,
    },
    userRefreshToken,
  })
  console.log('3')

  return response.json({
    token,
    refreshToken,
    name,
    email,
    role,
    permissions,
  })
}

export default use(
  errorHandler,
  allowMethods(['POST']),
  errorHandler,
  loginEmail,
)
