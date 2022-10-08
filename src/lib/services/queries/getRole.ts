import { query } from 'faunadb'
import { FaunaRole } from '../../models/api/fauna'
import { fauna } from '../fauna'

const getRole = async (role: string) => {
  return await fauna.query<FaunaRole>(
    query.Get(query.Match(query.Index('role_by_name'), role)),
  )
}
export default getRole
