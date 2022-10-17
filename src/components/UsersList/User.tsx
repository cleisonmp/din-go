import {
  Box,
  Button,
  Checkbox,
  Icon,
  Text,
  Td,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react'

import { RiPencilLine } from 'react-icons/ri'

import { User as UserType } from '../../lib/models/user'

type UserProps = Omit<UserType, 'password' | 'role'>

export const User = ({ id, name, email, createdAt }: UserProps) => {
  const isWideResolution = useBreakpointValue({
    base: false,
    md: true,
  })

  const handleSelect = () => {
    //add do selected list
  }
  const handleEdit = (id: number) => {
    console.log('edit user:' + id)
  }

  return (
    <Tr>
      <Td px={{ base: '3', lg: '8' }}>
        <Checkbox colorScheme='buttonColorScheme' onChange={handleSelect} />
      </Td>
      <Td>
        <Box>
          <Text fontWeight='bold'>{name}</Text>
          <Text color='primaryTextGray' fontSize={'sm'}>
            {email}
          </Text>
        </Box>
      </Td>
      {isWideResolution && <Td>{createdAt}</Td>}
      <Td>
        <Button
          size='sm'
          padding='2'
          color='primaryText'
          colorScheme={'buttonSecondaryColorScheme'}
          onClick={() => {
            handleEdit(id)
          }}
        >
          <Icon as={RiPencilLine} fontSize={{ base: '16', lg: '20' }} />
        </Button>
      </Td>
    </Tr>
  )
}
