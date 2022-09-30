import { useQuery } from 'react-query'
import { api } from '../../lib/services/api'
import { User } from '../../lib/models/user'

type UserType = Omit<User, 'password'>

type GetUsersResponse = {
  users: UserType[]
  totalCount: number
}

const getUsers = async (page: number): Promise<GetUsersResponse> => {
  const { data, headers } = await api.get<{ users: UserType[] }>('users', {
    params: {
      page,
    },
  })

  const totalCount = Number(headers['x-total-count'])

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

  return { users, totalCount }
}

export const useUsersList = (page: number) => {
  return useQuery(`users${page}`, () => getUsers(page), {
    staleTime: 1000 * 60 * 60, //1 hour
  })
}
