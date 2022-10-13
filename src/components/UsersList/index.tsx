//import { useUsersList } from '../../lib/hooks/useUsersList'
//import { useCurrentUserListPage } from '../contexts/CurrentUserListPage'

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
//import { User } from '../../components/UsersList/User'

interface UserListProps {
  setFetching: (newState: boolean) => void
}

export const UserList = ({ setFetching }: UserListProps) => {
  // const currentPage = useCurrentUserListPage((state) => state.currentPage)
  // const { data, isLoading, isFetching, error } = useUsersList(currentPage)
  //const data = undefined
  const isLoading = false,
    isFetching = false
  const error = undefined

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
              {/*data?.users.map((user) => {
                return (
                  <User
                    key={user.name + user.createdAt}
                    id={user.id}
                    name={user.name}
                    email={user.email}
                    createdAt={user.createdAt}
                  />
                )
              })*/}
            </Tbody>
          </Table>
          <Pagination totalCountOfRegisters={/*data?.totalCount ??*/ 0} />
        </>
      )}
    </>
  )
}
