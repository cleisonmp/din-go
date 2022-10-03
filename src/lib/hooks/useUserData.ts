import { useQuery } from 'react-query'
import { api } from '../../lib/services/api'
import { User } from '../../lib/models/user'

type UserType = Omit<User, 'password'>

export const getUser = async (userId: number): Promise<UserType> => {
  const { data } = await api.get<{ user: UserType }>(`users/${userId}`)

  return data.user
}

export const useUserData = (userId: number) => {
  return useQuery([`userId`, userId], () => getUser(userId), {
    staleTime: 1000 * 60 * 60, //1 hour
  })
}
