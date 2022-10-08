import type { NextApiRequest, NextApiResponse } from 'next'

import CryptoJS from 'crypto-js'
import { query } from 'faunadb'
import { fauna } from '../../../lib/services/fauna'
import { responseErrorHandler } from '../_lib/responseErrorHandler'
import { User } from '../../../lib/models/user'

const CreateUser = async (
  request: NextApiRequest,
  response: NextApiResponse,
) => {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).end('Method not allowed')
  }

  const { name, email, password, role } = request.body as Partial<User>

  if (!name || !email || !password || !role) {
    return responseErrorHandler(response, 400, 'Bad Request.')
  }

  const encryptedPass = CryptoJS.SHA3(password).toString(CryptoJS.enc.Base64)

  try {
    const roleRef = await fauna.query(
      query.Select(
        'ref',
        query.Get(query.Match(query.Index('role_by_name'), role)),
      ),
    )
    if (!roleRef) {
      return responseErrorHandler(response, 400, 'Role not found.')
    }

    const faunaReturn = await fauna.query(
      query.If(
        query.Not(
          query.Exists(query.Match(query.Index('user_by_email'), email)),
        ),
        query.Create(query.Collection('users'), {
          data: {
            name,
            email: email.toLowerCase(),
            password: encryptedPass,
            role,
            refresh_tokens: [],
          },
        }),
        null,
        //query.Abort('Duplicated user'),
      ),
    )

    if (faunaReturn) {
      return response.status(200).end('User successfully created')
    } else {
      return responseErrorHandler(
        response,
        400,
        'User already exists with this email.',
      )
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'

    return responseErrorHandler(response, 400, `Fauna error: ${errorMessage}`)
  }
}
export default CreateUser
