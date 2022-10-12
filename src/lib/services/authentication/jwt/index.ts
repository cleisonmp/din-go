import jwt from 'jsonwebtoken'
import jwtDecode from 'jwt-decode'
import { v4 as uuid } from 'uuid'
import { query } from 'faunadb'
import { fauna } from '../../fauna'
import {
  GenerateJwtAndRefreshTokenProps,
  DecodedToken,
} from '../../../models/api'
import { ApiAuthError } from '../../../models/api/error'

export interface TokenContent {
  email: string
  permissions?: string[]
  role?: string
}

export const getTokenEmail = (authorizationToken: string): TokenContent => {
  try {
    const tokenData = jwtDecode(authorizationToken) as DecodedToken
    console.log('getTokenEmail', tokenData)

    return { email: tokenData.sub }
  } catch (error) {
    throw new ApiAuthError('Invalid token format.', 401, 'token.invalid')
  }
}

export const verifyToken = (authorizationToken: string): TokenContent => {
  try {
    const tokenData = jwt.verify(
      authorizationToken as string,
      process.env.AUTH_SECRET,
    ) as DecodedToken

    console.log('verifyToken', tokenData)

    return {
      permissions: tokenData.permissions,
      role: tokenData.role,
      email: tokenData.sub,
    }
  } catch (error) {
    throw new ApiAuthError('Token expired.', 401, 'token.expired')
  }
}

const getUserRefreshTokens = async (email: string) => {
  try {
    const storedRefreshTokens = await fauna
      .query<string[]>(
        query.Select(
          ['data', 'refresh_tokens'],
          query.Get(query.Match(query.Index('user_by_email'), email)),
        ),
      )
      .catch()

    return storedRefreshTokens
  } catch (error) {
    return []
  }
}

const setUserRefreshTokens = async (email: string, refreshTokens: string[]) => {
  await fauna.query(
    query.Update(
      query.Select(
        'ref',
        query.Get(query.Match(query.Index('user_by_email'), email)),
      ),
      {
        data: {
          refresh_tokens: refreshTokens,
        },
      },
    ),
  )
}

export const checkRefreshTokenIsValid = async (
  email: string,
  refreshToken: string,
) => {
  try {
    const isRefreshTokenValid = await fauna.query<boolean>(
      query.ContainsValue(
        refreshToken,
        query.Select(
          ['data', 'refresh_tokens'],
          query.Get(query.Match(query.Index('user_by_email'), email)),
        ),
      ),
    )

    return isRefreshTokenValid
  } catch (error) {
    throw new ApiAuthError('Refresh token is invalid.', 401, 'token.invalid')
  }
}

/*const invalidateRefreshToken = async (email: string, refreshToken: string) => {
  const storedRefreshTokens = (await getUserRefreshTokens(email)) ?? []
  console.log('storedRefreshTokens', storedRefreshTokens)

  setUserRefreshTokens(
    email,
    storedRefreshTokens.filter((token) => token !== refreshToken),
  )
}*/

export const createRefreshToken = async (
  email: string,
  userRefreshToken: string,
) => {
  const storedRefreshTokens = (await getUserRefreshTokens(email)) ?? []
  const refreshToken = uuid()

  const newRefreshTokens = storedRefreshTokens.filter(
    (token) => token !== userRefreshToken,
  )

  setUserRefreshTokens(email, [...newRefreshTokens, refreshToken])

  return refreshToken
}

export const generateJwtAndRefreshToken = async ({
  email,
  payload,
  userRefreshToken,
}: GenerateJwtAndRefreshTokenProps) => {
  const token = jwt.sign(payload, process.env.AUTH_SECRET, {
    subject: email,
    expiresIn: 60, // seconds
  })

  const refreshToken = await createRefreshToken(email, userRefreshToken)

  return {
    token,
    refreshToken,
  }
}
