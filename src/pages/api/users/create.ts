import type { NextApiRequest, NextApiResponse } from 'next'

import CryptoJS from 'crypto-js'
import { query } from 'faunadb'
import { fauna } from '../../../lib/services/fauna'

import { User } from '../../../lib/models/user'
import { use } from 'next-api-route-middleware'
import {
  allowMethods,
  errorHandler,
} from '../../../lib/services/api/middleware'
import { ApiAuthError } from '../../../lib/errors/ApiAuthError'

const CreateUser = async (
  request: NextApiRequest,
  response: NextApiResponse<string>,
) => {
  const { name, email, password, role } = request.body as Partial<User>

  if (!name || !email || !password || !role) {
    throw new ApiAuthError('Invalid request body.', 400, 'request.invalid')
  }

  const encryptedPass = CryptoJS.SHA3(password).toString(CryptoJS.enc.Base64)

  const roleRef = await fauna.query(
    query.Select(
      'ref',
      query.Get(query.Match(query.Index('role_by_name'), role)),
    ),
  )
  if (!roleRef) {
    throw new ApiAuthError('Role not found.', 400, 'role.notFound')
  }

  const faunaReturn = await fauna.query(
    query.If(
      query.Not(query.Exists(query.Match(query.Index('user_by_email'), email))),
      query.Create(query.Collection('users'), {
        data: {
          name,
          email: email.toLowerCase(),
          password: encryptedPass,
          role,
          refresh_tokens: [],
          created_at: new Date().toISOString(),
        },
      }),
      null,
      //query.Abort('Duplicated user'),
    ),
  )

  if (!faunaReturn) {
    throw new ApiAuthError(
      'User already exists with this email.',
      400,
      'user.duplicated',
    )
  }
  return response.status(200).send('User successfully created')
}
export default use(errorHandler, allowMethods(['POST']), CreateUser)
