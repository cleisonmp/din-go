import { useQuery } from 'react-query'
import { api } from '../../lib/services/api'
import { User } from '../../lib/models/user'

type UserType = Omit<User, 'password'>

const getUsers = async (): Promise<UserType[]> => {
  const { data } = await api.get<{ users: UserType[] }>('users')

  const users = data.users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: new Date(user.createdAt).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    }
  })

  return users
}

export const useUsersList = () => {
  return useQuery('users', getUsers, {
    staleTime: 1000 * 60 * 60, //1 hour
  })
}
