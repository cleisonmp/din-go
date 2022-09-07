import { FC, PropsWithChildren } from 'react'
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'

import { useFormContext } from 'react-hook-form'

interface InputFormControllerProps extends PropsWithChildren {
  name: string
  label?: string
  children: JSX.Element
}

export const InputFormController: FC<InputFormControllerProps> = ({
  name,
  label,
  children,
}) => {
  const {
    formState: { errors },
  } = useFormContext()

  const hasLabel = !!label
  const errorMessage = errors[name]?.message?.toString()

  return (
    <FormControl isInvalid={!!errorMessage}>
      {hasLabel && <FormLabel htmlFor={name}>{label}</FormLabel>}
      {children}
      {!!errors && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  )
}
