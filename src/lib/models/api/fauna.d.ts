export type FaunaUser = {
  ref: string
  ts: number
  data: {
    name: string
    email: string
    role: string
    password: string
    refresh_token: string | null
  }
}
export type FaunaRole = {
  ref: string
  ts: number
  data: {
    name: string
    permissions: string[]
  }
}
