import { useQuery } from 'react-query'
import {
  Checkbox,
  Table,
  Th,
  Thead,
  Tr,
  Tbody,
  useBreakpointValue,
  Flex,
  Spinner,
  Text,
} from '@chakra-ui/react'

import { Pagination } from '../../components/Pagination'
import { User } from '../../components/UsersList/User'

import { api } from '../../lib/services/api'
import { User as UserType } from '../../lib/models/user'

interface UserListProps {
  setFetching: (newState: boolean) => void
}

export const UserList = ({ setFetching }: UserListProps) => {
  const { data, isLoading, isFetching, error } = useQuery(
    'users',
    async () => {
      const { data } = await api.get<{ users: UserType[] }>('api/users/')
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
    },
    {
      staleTime: 1000 * 60 * 60, //1 hour
    },
  )
  setFetching(!isLoading && isFetching)

  const isWideResolution = useBreakpointValue({
    base: false,
    md: true,
  })

  return (
    <>
      {isLoading ? (
        <Flex
          justify='center'
          align='center'
          marginTop='-2.3rem'
          height='full'
          width='100%'
        >
          <Spinner />
        </Flex>
      ) : error ? (
        <Flex justify='center'>
          <Text>{`Failed to request data from server: ${error}`}</Text>
        </Flex>
      ) : (
        <>
          <Table mt='8' variant='simple' colorScheme='tableColorScheme'>
            <Thead>
              <Tr>
                <Th px={{ base: '3', lg: '8' }} color='gray.300' width='8'>
                  <Checkbox colorScheme='buttonColorScheme' />
                </Th>
                <Th>User</Th>
                <Th>Status</Th>
                {isWideResolution && <Th>Created at</Th>}
                <Th width={8}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((user) => {
                return (
                  <User
                    key={user.name + user.createdAt}
                    id={user.id}
                    name={user.name}
                    email={user.email}
                    createdAt={user.createdAt}
                  />
                )
              })}
            </Tbody>
          </Table>
          <Pagination />
        </>
      )}
    </>
  )
}
