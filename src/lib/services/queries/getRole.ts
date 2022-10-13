import { query } from 'faunadb'
import { ApiAuthError } from '../../errors/ApiAuthError'
import { FaunaRole } from '../../models/api'
import { fauna } from '../fauna'

const getRole = async (role: string) => {
  try {
    return await fauna.query<FaunaRole>(
      query.Get(query.Match(query.Index('role_by_name'), role)),
    )
  } catch (error) {
    throw new ApiAuthError(
      `User role "${role}" not found.`,
      401,
      'role.notFound',
    )
  }
}
export default getRole
