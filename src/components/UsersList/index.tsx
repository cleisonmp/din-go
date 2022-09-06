import {
  Checkbox,
  Table,
  Th,
  Thead,
  Tr,
  Tbody,
  useBreakpointValue,
} from '@chakra-ui/react'

import { Pagination } from '../../components/Pagination'
import { User } from '../../components/UsersList/User'

export const UserList = () => {
  const isWideResolution = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
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
          <User />
          <User />
          <User />
          <User />
          <User />
          <User />
          <User />
          <User />
          <User />
          <User />
        </Tbody>
      </Table>
      <Pagination />
    </>
  )
}
