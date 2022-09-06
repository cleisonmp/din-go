import {
  FormControl,
  Input,
  InputProps,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'

export const InputSearch = ({ ...rest }: InputProps) => {
  const formFocusBorderColor = useColorModeValue(
    'primaryBlue',
    'primaryTextGray',
  )

  const handleClickSearch = () => {
    console.log('handleClickSearch')
  }

  return (
    <FormControl>
      <InputGroup {...rest}>
        <Input
          id='search'
          variant={'filled'}
          size={'lg'}
          placeholder='Search...'
          focusBorderColor={formFocusBorderColor}
          borderRadius='full'
        />

        <InputRightElement height={'full'}>
          <Search2Icon onClick={handleClickSearch} color={'primaryTextGray'} />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  )
}
