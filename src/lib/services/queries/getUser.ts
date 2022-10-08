import { query } from 'faunadb'
import { fauna } from '../fauna'
import { FaunaUser } from '../../models/api/fauna'

const getUserByEmailAndPassword = async (
  email: string,
  encryptedPass: string,
) => {
  return fauna.query<FaunaUser>(
    query.Get(
      query.Match(query.Index('user_by_email_and_password'), [
        email,
        encryptedPass,
      ]),
    ),
  )
}
const getUserByEmail = async (email: string) => {
  return fauna.query<FaunaUser>(
    query.Get(query.Match(query.Index('user_by_email'), email)),
  )
}
export { getUserByEmailAndPassword, getUserByEmail }
