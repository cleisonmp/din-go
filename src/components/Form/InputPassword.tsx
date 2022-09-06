import { useState } from 'react'

import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

export function InputPassword() {
  const [showingPassword, setShowingPassword] = useState(false)
  const handleClickShowingPassword = () => setShowingPassword((state) => !state)
  const formFocusBorderColor = useColorModeValue(
    'primaryBlue',
    'primaryTextGray',
  )

  return (
    <FormControl>
      <FormLabel htmlFor="password">Password</FormLabel>
      <InputGroup>
        <Input
          id="password"
          type={showingPassword ? 'text' : 'password'}
          variant={'filled'}
          size={'lg'}
          focusBorderColor={formFocusBorderColor}
        />

        <InputRightElement height={'full'}>
          {showingPassword ? (
            <ViewOffIcon
              onClick={handleClickShowingPassword}
              color={'primaryTextGray'}
            />
          ) : (
            <ViewIcon
              onClick={handleClickShowingPassword}
              color={'primaryTextGray'}
            />
          )}
        </InputRightElement>
      </InputGroup>
    </FormControl>
  )
}
