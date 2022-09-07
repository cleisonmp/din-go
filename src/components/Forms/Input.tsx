import { useFormContext } from 'react-hook-form'

import {
  Input as ChakraInput,
  InputGroup,
  InputProps as ChakraInputProps,
  useColorModeValue,
} from '@chakra-ui/react'

import { InputFormController } from './InputFormController'

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  type?: string
  children?: JSX.Element
}

export const Input = ({
  name,
  label,
  type,
  focusBorderColor,
  children,
  ...rest
}: InputProps) => {
  const { register } = useFormContext()
  const defaultFocusBorderColor = useColorModeValue(
    'primaryBlue',
    'primaryTextGray',
  )

  return (
    <InputFormController name={name} label={label}>
      <InputGroup>
        <ChakraInput
          id={name}
          type={type || 'text'}
          variant={'filled'}
          size={{ base: 'md', md: 'lg', lg: 'lg' }}
          focusBorderColor={focusBorderColor || defaultFocusBorderColor}
          {...register(name)}
          {...rest}
        />
        {children}
      </InputGroup>
    </InputFormController>
  )
}
