import { query } from 'faunadb'
import { fauna } from '../fauna'
import { FaunaUser } from '../../models/api'
import { ApiAuthError } from '../../models/api/error'

const getUserByEmailAndPassword = async (
  email: string,
  encryptedPass: string,
) => {
  try {
    return await fauna.query<FaunaUser>(
      query.Get(
        query.Match(query.Index('user_by_email_and_password'), [
          email,
          encryptedPass,
        ]),
      ),
    )
  } catch (error) {
    console.log('getUserByEmailAndPassword=>', error)

    throw new ApiAuthError('Invalid credentials.', 401, 'credentials.invalid')
  }
}
const getUserByEmail = async (email: string) => {
  try {
    return await fauna.query<FaunaUser>(
      query.Get(query.Match(query.Index('user_by_email'), email)),
    )
  } catch (error) {
    throw new ApiAuthError('User not found.', 401, 'user.notFound')
  }
}
export { getUserByEmailAndPassword, getUserByEmail }
