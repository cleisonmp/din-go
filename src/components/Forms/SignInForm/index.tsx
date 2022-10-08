import router from 'next/router'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import {
  Button,
  Checkbox,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { Input } from '../Input'
import { InputPassword } from '../InputPassword'
import { useLoggedInUserData } from '../../contexts/LoggedInUserData'
import { api } from '../../../lib/services/api'
import { AxiosError } from 'axios'
import { useState } from 'react'

type SignInFormData = {
  email: string
  password: string
}
const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('E-mail is required')
    .email('Invalid e-mail format'),
  password: yup.string().required('Password is required'),
})

export function SignInForm() {
  const [loginErrorMessage, setLoginErrorMessage] = useState('')
  const { setUser } = useLoggedInUserData()
  const formContextData = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  })
  const formBgColor = useColorModeValue('gray.50', 'gray.600')

  const handleSignIn = async (formData: SignInFormData) => {
    setLoginErrorMessage('')
    const response = await api
      .post('auth/login', {
        email: formData.email,
        password: formData.password,
      })
      .catch((error: AxiosError) => {
        interface ApiError {
          error: boolean
          message: string
        }
        const data = error.response?.data as ApiError
        setLoginErrorMessage(data.message)
      })

    if (response) {
      setUser({
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
        avatarUrl: 'https://i.pravatar.cc/150',
      })
      router.push(`/dashboard/`)
    }
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
        {loginErrorMessage.length > 0 && (
          <Text fontSize='sm' color='primaryOrange'>
            {loginErrorMessage}
          </Text>
        )}
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
