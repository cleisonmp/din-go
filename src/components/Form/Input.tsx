import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  useColorModeValue,
} from '@chakra-ui/react'

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
}
export function Input({ name, label, focusBorderColor, ...rest }: InputProps) {
  const defaultFocusBorderColor = useColorModeValue(
    'primaryBlue',
    'primaryTextGray',
  )
  const hasLabel = !!label

  return (
    <FormControl>
      {hasLabel && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        name={name}
        id={name}
        variant={'filled'}
        size={'lg'}
        focusBorderColor={focusBorderColor || defaultFocusBorderColor}
        {...rest}
      />
    </FormControl>
  )
}
