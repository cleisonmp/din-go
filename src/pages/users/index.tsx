import type { NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'

import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'

import { RiAddLine } from 'react-icons/ri'
import { UserList } from '../../components/UsersList'
import { useEffect } from 'react'

const Users: NextPage = () => {
  const userListBgColor = useColorModeValue('gray.50', 'gray.600')

  useEffect(() => {
    fetch('http://localhost:3000/api/users/')
      .then((response) => response.json())
      .then((data) => console.log(data))
  }, [])

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
          <Heading size='lg' fontWeight='normal'>
            Users
          </Heading>

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
        <UserList />
      </Box>
    </>
  )
}

export default Users
