import { useCallback } from 'react'
import { useCurrentUserListPage } from '../contexts/CurrentUserListPage'
import shallow from 'zustand/shallow'

import { Button, Link as ChakraLink } from '@chakra-ui/react'

interface PageNumberProps {
  isCurrentPage?: boolean
  pageNumber: number
  href: string
}
export const PageNumber = ({
  isCurrentPage = false,
  pageNumber,
}: PageNumberProps) => {
  const setCurrentPage = useCurrentUserListPage(
    useCallback((state) => state.setCurrentPage, []),
    shallow,
  )

  if (isCurrentPage) {
    return (
      <Button
        size='sm'
        fontSize='md'
        width='4'
        colorScheme='gray'
        disabled
        _disabled={{ cursor: 'default' }}
      >
        {pageNumber}
      </Button>
    )
  }
  return (
    <ChakraLink
      as={'span'}
      display='flex'
      alignItems='center'
      color='primaryTextGray'
      onClick={() => setCurrentPage(pageNumber)}
    >
      {pageNumber}
    </ChakraLink>
  )
}
