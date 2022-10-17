import { useQuery } from 'react-query'
import { api } from '../../lib/services/api'
import { User } from '../../lib/models/user'

type UserType = Omit<User, 'password' | 'id'>

type GetUsersResponse = {
  users: UserType[]
  totalCount: number
}

export const getUsers = async (page: number): Promise<GetUsersResponse> => {
  const { data } = await api.get<UserType[]>('users/getusers', {
    params: {
      page: page.toString(),
    },
  })
  //const totalCount = Number(headers['x-total-count'])

  const totalCount = 10

  return { users: data, totalCount }
}

export const useUsersList = (page: number) => {
  return useQuery([`users`, page], () => getUsers(page), {
    staleTime: 1000 * 60 * 60, //1 hour
  })
}
