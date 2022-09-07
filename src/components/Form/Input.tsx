import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  useColorModeValue,
} from '@chakra-ui/react'

import { useFormContext } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  //formRegister: UseFormRegister<FieldValues>
}

export const Input = ({
  name,
  label,
  focusBorderColor,
  ...rest
}: InputProps) => {
  const { register } = useFormContext()
  const defaultFocusBorderColor = useColorModeValue(
    'primaryBlue',
    'primaryTextGray',
  )
  const hasLabel = !!label

  return (
    <FormControl>
      {hasLabel && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        id={name}
        variant={'filled'}
        size={'lg'}
        focusBorderColor={focusBorderColor || defaultFocusBorderColor}
        {...register(name)}
        {...rest}
      />
    </FormControl>
  )
}
