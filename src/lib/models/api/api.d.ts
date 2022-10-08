export interface DecodedToken {
  permissions: string[]
  role: string
  iat: number
  exp: number
  sub: string
}
export interface GenerateJwtAndRefreshTokenProps {
  email: string
  payload: { permissions: string[]; role: string }
  userRefreshToken: string
}
