import type { NextPage } from 'next'
import Head from 'next/head'
import { Divider, Flex, Heading, useColorModeValue } from '@chakra-ui/react'
import { NewUserForm } from '../../components/Forms/NewUserForm'
import { withSSRAuth } from '../../lib/services/authentication/withSSRAuth'
import { setupAPIClient } from '../../lib/services/api'

const CreateUser: NextPage = () => {
  const createUserBgColor = useColorModeValue('gray.50', 'gray.600')
  return (
    <>
      <Head>
        <title>din.go - New User</title>
      </Head>
      <Flex
        as='main'
        flexDirection='column'
        flex='1'
        borderRadius='2xl'
        p='8'
        gap='6'
        bg={createUserBgColor}
      >
        <Heading>New user</Heading>
        <Divider borderColor='primaryTextGray' />
        <NewUserForm />
      </Flex>
    </>
  )
}

export default CreateUser

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    const ssrApiClient = setupAPIClient(ctx)
    //const response =
    await ssrApiClient.get('/auth/checkPermissions')

    return {
      props: {},
    }
  },
  {
    permissions: ['users.create'],
    roles: ['Admin'],
  },
)
