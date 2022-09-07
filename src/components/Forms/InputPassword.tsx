import { useState } from 'react'

import { InputRightElement } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import { Input } from './Input'

export function InputPassword() {
  const [showingPassword, setShowingPassword] = useState(false)
  const handleClickShowingPassword = () => setShowingPassword((state) => !state)

  return (
    <Input
      name='password'
      label='Password'
      type={showingPassword ? 'text' : 'password'}
    >
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
    </Input>
  )
}
