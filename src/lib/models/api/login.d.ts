export type LoginResponse = {
  token: string
  refreshToken: string
  name: string
  email: string
  role: string
  permissions: string[]
}
