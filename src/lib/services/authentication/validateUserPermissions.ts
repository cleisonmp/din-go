//import { UserPermissions } from '../../models/user'

type UserPermissions = {
  permissions: string[]
  role: string
}

export type RequiredPermissions = {
  permissions: string[]
  roles: string[]
}
type ValidateUserPermissionsParams = {
  userPermissions: UserPermissions
  requiredPermissions: RequiredPermissions
}

export function validateUserPermissions({
  userPermissions,
  requiredPermissions,
}: ValidateUserPermissionsParams) {
  const hasAllPermissions =
    userPermissions.permissions[0].toUpperCase() === 'FULL'
      ? true
      : requiredPermissions.permissions.every((permission) => {
          return userPermissions.permissions.includes(permission)
        })

  if (!hasAllPermissions) {
    return false
  }

  if (requiredPermissions.roles.length > 0) {
    const hasAllRoles = requiredPermissions.roles.every((permission) => {
      return userPermissions.role === permission
    })

    if (!hasAllRoles) {
      return false
    }
  }

  return true
}
