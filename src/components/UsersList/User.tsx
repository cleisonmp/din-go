import NextLink from 'next/link'

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

export const User = () => {
  const isWideResolution = useBreakpointValue({
    base: false,
    lg: true,
  })
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: '2-digit',
    month: 'short',
    day: 'numeric',
  })

  return (
    <Tr>
      <Td px={{ base: '3', lg: '8' }}>
        <Checkbox colorScheme='buttonColorScheme' />
      </Td>
      <Td>
        <Box>
          <Text fontWeight='bold'>User Name</Text>
          <Text color='primaryTextGray' fontSize={'sm'}>
            user.mail@mail.com
          </Text>
        </Box>
      </Td>
      <Td>
        <Text fontWeight='bold'>Active</Text>
      </Td>
      {isWideResolution && <Td>{formattedDate}</Td>}
      <Td>
        <NextLink href='#'>
          <Button
            size='sm'
            padding='2'
            color='primaryText'
            colorScheme={'buttonSecondaryColorScheme'}
          >
            <Icon as={RiPencilLine} fontSize={{ base: '16', lg: '20' }} />
          </Button>
        </NextLink>
      </Td>
    </Tr>
  )
}
