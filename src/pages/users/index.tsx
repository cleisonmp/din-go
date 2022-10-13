import type { NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'

import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react'

import { RiAddLine } from 'react-icons/ri'
import { UserList } from '../../components/UsersList'
import { useState } from 'react'
import { withSSRAuth } from '../../lib/services/authentication/withSSRAuth'
import { setupAPIClient } from '../../lib/services/api'

const Users: NextPage = () => {
  const [isFetching, setIsFetching] = useState(false)
  const userListBgColor = useColorModeValue('gray.50', 'gray.600')

  const changeFetchingState = (newState: boolean) => {
    setIsFetching(newState)
  }

  return (
    <>
      <Head>
        <title>din.go - Users</title>
      </Head>

      <Box
        as='main'
        flex='1'
        borderRadius='2xl'
        p={{ base: '6', lg: '8' }}
        bg={userListBgColor}
        overflow={{ base: 'scroll', md: 'unset' }}
      >
        <Flex justifyContent='space-between' w='100%'>
          <Flex justifyContent='center' align='center' gap='0.75rem'>
            <Heading size='lg' fontWeight='normal'>
              Users
            </Heading>
            {isFetching && <Spinner size='sm' />}
          </Flex>

          <NextLink href='/users/create'>
            <Button
              size='sm'
              fontSize={{ base: 'xs', lg: 'sm' }}
              iconSpacing={{ base: '1', lg: '2' }}
              color='primaryText'
              leftIcon={
                <Icon as={RiAddLine} fontSize={{ base: '18', lg: '20' }} />
              }
            >
              New User
            </Button>
          </NextLink>
        </Flex>
        <UserList setFetching={changeFetchingState} />
      </Box>
    </>
  )
}

export default Users

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    const ssrApiClient = setupAPIClient(ctx)
    //const response =
    await ssrApiClient.get('/auth/checkPermissions')

    console.log('going to return without error')
    return {
      props: {},
    }
  },
  {
    permissions: ['users.read'],
    roles: [],
  },
)
