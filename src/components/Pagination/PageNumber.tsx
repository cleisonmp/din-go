import { useCallback } from 'react'
import { useCurrentUserListPage } from '../contexts/CurrentUserListPage'
import shallow from 'zustand/shallow'

import { Button, Link as ChakraLink } from '@chakra-ui/react'
import { prefetchData } from '../../lib/utils/prefetchData'
import { getUsers } from '../../lib/hooks/useUsersList'

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

  //TODO move outside
  const handlePrefetch = (pageNumber: number) => {
    prefetchData(
      `users${pageNumber}`,
      () => getUsers(pageNumber),
      1000 * 60 * 60,
    )
  }

  return (
    <ChakraLink
      as={'span'}
      display='flex'
      alignItems='center'
      color='primaryTextGray'
      onMouseOver={() => handlePrefetch(pageNumber)}
      onClick={() => setCurrentPage(pageNumber)}
    >
      {pageNumber}
    </ChakraLink>
  )
}
