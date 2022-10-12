import { NextApiRequest } from 'next'

type ApiUserInfo = {
  user: {
    email: string
    role: string
    permissions: string[]
  }
}

export type NextApiRequestWithUser = NextApiRequest & ApiUserInfo
