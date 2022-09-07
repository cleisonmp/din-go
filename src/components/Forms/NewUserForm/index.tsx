import router from 'next/router'

import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button, Flex, SimpleGrid } from '@chakra-ui/react'
import { Input } from '../Input'
import { InputPassword } from '../InputPassword'

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

  const handleCreateUser = async (formData: CreateUserFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500)) //remove later loading effect
    console.log(formData)

    formContextData.reset()
    router.push(`/users/`)
  }
  const handleCancel = () => {
    formContextData.reset()
    router.push(`/users/`)
  }

  return (
    <FormProvider {...formContextData}>
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
