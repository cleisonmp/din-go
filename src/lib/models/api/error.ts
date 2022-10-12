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
  public originalError: unknown
  constructor(
    message: string,
    statusCode: number,
    errorCode: ErrorCode,
    originalError?: unknown,
  ) {
    super(message)
    this.errorCode = errorCode
    this.statusCode = statusCode
    this.originalError = originalError ?? 'this.originalError'
  }
}
