type ErrorCode =
  | 'credentials.invalid'
  | 'method.invalid'
  | 'request.invalid'
  | 'role.notFound'
  | 'token.invalid'
  | 'token.expired'
  | 'token.notFound'
  | 'refreshToken.notFound'
  | 'user.duplicated'
  | 'user.notFound'

export class ApiAuthError extends Error {
  public errorCode: ErrorCode
  public statusCode: number
  constructor(message: string, statusCode: number, errorCode: ErrorCode) {
    super(message)
    this.errorCode = errorCode
    this.statusCode = statusCode
  }
}
