import router from 'next/router'

import { Button, Checkbox, Flex, useColorModeValue } from '@chakra-ui/react'

import { Input } from './Input'
import { InputPassword } from './InputPassword'
import { useLoggedInUserData } from '../contexts/LoggedInUserData'

export function SignInForm() {
  const { setUser } = useLoggedInUserData()
  const formBgColor = useColorModeValue('gray.50', 'gray.600')

  const handleSignIn = () => {
    setUser({
      name: 'User Name',
      email: 'user@example.com',
      role: 'Admin',
      avatarUrl: 'https://i.pravatar.cc/150',
    })
    router.push(`/dashboard/`)
  }

  return (
    <Flex
      as={'form'}
      flexDir={'column'}
      p={8}
      w={360}
      bg={formBgColor}
      borderRadius={'lg'}
      shadow={'xl'}
      gap={4}
    >
      <Input name="email" label="E-mail" type={'email'} />
      <InputPassword />

      <Button
        // type="submit"
        type="button"
        size={'lg'}
        color={'primaryText'}
        onClick={handleSignIn}
        // mt={2}
      >
        Login
      </Button>
      <Flex justifyContent={'space-between'} color={'primaryTextGray'}>
        <Checkbox size="sm" colorScheme="buttonColorScheme">
          Remember me
        </Checkbox>
        <Button fontSize={'sm'} variant="link" color={'primaryTextGray'}>
          Forgot your password?
        </Button>
      </Flex>
    </Flex>
  )
}
