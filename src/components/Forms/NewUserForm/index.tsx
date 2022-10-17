import router from 'next/router'

import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import { Input } from '../Input'
import { InputPassword } from '../InputPassword'
import { api } from '../../../lib/services/api'
import { useState } from 'react'
import { ApiAuthError } from '../../../lib/errors'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Name is required').trim(),
  email: yup
    .string()
    .required('E-mail is required')
    .email('Invalid e-mail format'),
  role: yup.string().required('Role is required'),
  password: yup.string().required('Password is required').min(8).trim(),
})
export type CreateUserFormData = yup.InferType<typeof createUserFormSchema>

export const NewUserForm = () => {
  const formContextData = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema),
  })
  const [apiErrorMessage, setApiErrorMessage] = useState('')
  const hasApiError = apiErrorMessage.length > 0

  const handleCreateUser = async (formData: CreateUserFormData) => {
    //await new Promise((resolve) => setTimeout(resolve, 1500))
    const { name, email, password } = formData
    console.log(formData)

    try {
      await api.post('users/create', {
        name,
        email,
        password,
        role: 'Admin',
      })

      toast.success('User successfully created.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })

      formContextData.reset()
      router.push(`/users/`)
    } catch (error) {
      if (error instanceof AxiosError<ApiAuthError>) {
        setApiErrorMessage(error?.response?.data?.message)
      }
    }
  }
  const handleCancel = () => {
    formContextData.reset()
    router.push(`/users/`)
  }

  return (
    <FormProvider {...formContextData}>
      {hasApiError && (
        <Text fontSize='sm' color='primaryOrange'>
          {apiErrorMessage}
        </Text>
      )}

      <Flex
        as='form'
        onSubmit={formContextData.handleSubmit(handleCreateUser)}
        flexDirection='column'
        gap='6'
      >
        <Flex flexDirection='column' gap={{ base: '6', lg: '8' }}>
          <SimpleGrid
            minChildWidth='200px'
            spacing={{ base: '6', lg: '8' }}
            w='full'
          >
            <Input name='name' label='Full name' />
            <Input name='email' type='email' label='E-mail' />
          </SimpleGrid>
          <SimpleGrid
            minChildWidth='200px'
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
          <Button colorScheme='gray' onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type='submit'
            color='primaryText'
            isLoading={formContextData.formState.isSubmitting}
            loadingText='Saving...'
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </FormProvider>
  )
}
