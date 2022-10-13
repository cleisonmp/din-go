export type UserPermissions = {
  permissions: string[]
  role: string
}

export type User = {
  id: number
  name: string
  email: string
  role: string
  createdAt: string
  password: string
}
