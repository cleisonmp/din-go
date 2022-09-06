import type { NextPage } from 'next'
import Head from 'next/head'

import {
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react'
import { Input } from '../../components/Form/Input'
import { InputPassword } from '../../components/Form/InputPassword'

const CreateUser: NextPage = () => {
  const userListBgColor = useColorModeValue('gray.50', 'gray.600')

  return (
    <>
      <Head>
        <title>din.go - New User</title>
      </Head>

      <Flex
        flexDirection='column'
        as='main'
        flex='1'
        borderRadius='2xl'
        p='8'
        gap='6'
        bg={userListBgColor}
      >
        <Heading>New user</Heading>
        <Divider borderColor='primaryTextGray' />
        <Flex flexDirection='column' gap={{ base: '6', lg: '8' }}>
          <SimpleGrid
            minChildWidth='300px'
            spacing={{ base: '6', lg: '8' }}
            w='full'
          >
            <Input name='name' label='Full name' />
            <Input name='email' type='email' label='E-mail' />
          </SimpleGrid>
          <SimpleGrid
            minChildWidth='300px'
            spacing={{ base: '6', lg: '8' }}
            w='full'
          >
            <InputPassword />
            <Input name='role' label='Role' />
          </SimpleGrid>
        </Flex>
        <Flex
          alignItems='center'
          justifyContent='flex-end'
          gap={{ base: '6', lg: '8' }}
        >
          <Button colorScheme='gray'>Cancel</Button>
          <Button color='primaryText'>Save</Button>
        </Flex>
      </Flex>
    </>
  )
}

export default CreateUser
