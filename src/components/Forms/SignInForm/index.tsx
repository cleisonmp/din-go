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
import { useState } from 'react'
import { signIn } from '../../../lib/services/authentication'

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
    await signIn(formData.email, formData.password)
      .then((response) => {
        setUser({
          name: response.name,
          email: response.email,
          role: response.role,
          avatarUrl: response.avatarUrl,
        })
        router.push(`/dashboard/`)
      })
      .catch((error) => {
        console.log('error', error)

        setLoginErrorMessage(
          error.response.data.message ?? error.message ?? 'Unknown error.',
        )
      })
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
