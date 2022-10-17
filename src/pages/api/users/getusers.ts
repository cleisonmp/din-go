import type { NextApiRequest, NextApiResponse } from 'next'

import { query } from 'faunadb'
import { fauna } from '../../../lib/services/fauna'

import { use } from 'next-api-route-middleware'
import {
  allowMethods,
  errorHandler,
} from '../../../lib/services/api/middleware'
import { ApiAuthError } from '../../../lib/errors/ApiAuthError'
import { FaunaUser } from '../../../lib/models/api'

type FaunaResponse = {
  data: FaunaUser[]
}

const GetUsers = async (request: NextApiRequest, response: NextApiResponse) => {
  const { page } = request.query

  if (!page) {
    throw new ApiAuthError('Invalid request body.', 400, 'request.invalid')
  }
  try {
    const { data } = await fauna.query<FaunaResponse>(
      query.Map(
        query.Paginate(query.Match('all_users'), { size: 10 }),
        query.Lambda('x', query.Get(query.Var('x'))),
      ),
    )

    const users = data.map((user) => {
      return {
        //id: user.ref,
        name: user.data.name,
        email: user.data.email,
        role: user.data.role,
        createdAt: new Date(user.data.created_at).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
      }
    })
    //setheader 'x-total-count': String(totalUsers),
    return response.json(users)
  } catch (error) {
    throw new ApiAuthError('Database connection error.', 500, 'user.duplicated')
  }
}
export default use(errorHandler, allowMethods(['GET']), GetUsers)
