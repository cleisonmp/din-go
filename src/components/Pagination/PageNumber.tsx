import { useCallback } from 'react'
import { useCurrentUserListPage } from '../contexts/CurrentUserListPage'
import shallow from 'zustand/shallow'

import { Button, Link as ChakraLink } from '@chakra-ui/react'
import { usePrefetchData } from '../../lib/hooks/usePrefetchData'
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

  const prefetchData = usePrefetchData(
    `users${pageNumber}`,
    () => getUsers(pageNumber),
    1000 * 60 * 60,
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

  const handlePrefetch = () => {
    prefetchData()
  }

  return (
    <ChakraLink
      as={'span'}
      display='flex'
      alignItems='center'
      color='primaryTextGray'
      onMouseOver={handlePrefetch}
      onClick={() => setCurrentPage(pageNumber)}
    >
      {pageNumber}
    </ChakraLink>
  )
}
