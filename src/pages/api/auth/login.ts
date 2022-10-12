import type { NextApiRequest, NextApiResponse } from 'next'
import CryptoJS from 'crypto-js'
import { generateJwtAndRefreshToken } from '../../../lib/services/authentication/jwt'
import { withErrorHandler } from '@cleisonmp/next-api-route-middleware'

import {
  getRole,
  getUserByEmailAndPassword,
} from '../../../lib/services/queries'
import { allowMethods, errorHandler } from '../_lib/middleware'
import { LoginResponse } from '../../../lib/models/api'
import { ApiAuthError } from '../../../lib/models/api/error'

const Login = async (
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
  const {
    data: { name, role },
  } = await getUserByEmailAndPassword(email, encryptedPass)

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

export default withErrorHandler({
  errorHandler,
  middlewares: [allowMethods(['POST']), Login],
})

/*export default use({
  //middlewares: [errorHandler, allowMethods(['POST']), Login],
  middlewares: [
    allowMethods(['POST']),
    allowMethods(['POST']),
    allowMethods(['POST']),
    Login,
  ],
})*/
