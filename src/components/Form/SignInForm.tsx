//import router from 'next/router'

import { Button, Checkbox, Flex, useColorModeValue } from '@chakra-ui/react'
import { useForm, FormProvider } from 'react-hook-form'

import { Input } from './Input'
import { InputPassword } from './InputPassword'
import { useLoggedInUserData } from '../contexts/LoggedInUserData'

type SignInFormData = {
  email: string
  password: string
}

export function SignInForm() {
  const { setUser } = useLoggedInUserData()
  const formContextData = useForm<SignInFormData>()
  const formBgColor = useColorModeValue('gray.50', 'gray.600')

  const handleSignIn = async (formData: SignInFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500)) //remove later loading effect
    console.log(formData)
    //console.log(formContextData.formState.errors)

    setUser({
      name: 'User Name',
      email: 'user@example.com',
      role: 'Admin',
      avatarUrl: 'https://i.pravatar.cc/150',
    })
    //router.push(`/dashboard/`)
  }

  return (
    <FormProvider {...formContextData}>
      <Flex
        as={'form'}
        onSubmit={formContextData.handleSubmit(handleSignIn)}
        flexDir={'column'}
        p={8}
        w={360}
        bg={formBgColor}
        borderRadius={'lg'}
        shadow={'xl'}
        gap={4}
      >
        <Input name='email' label='E-mail' type={'email'} />
        <InputPassword />

        <Button
          type='submit'
          size={'lg'}
          color={'primaryText'}
          isLoading={formContextData.formState.isSubmitting}
          loadingText='Authenticating...'
          // mt={2}
        >
          Login
        </Button>
        <Flex justifyContent={'space-between'} color={'primaryTextGray'}>
          <Checkbox size='sm' colorScheme='buttonColorScheme'>
            Remember me
          </Checkbox>
          <Button fontSize={'sm'} variant='link' color={'primaryTextGray'}>
            Forgot your password?
          </Button>
        </Flex>
      </Flex>
    </FormProvider>
  )
}
