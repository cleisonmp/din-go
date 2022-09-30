import { useCallback } from 'react'
import shallow from 'zustand/shallow'
import { useCurrentUserListPage } from '../contexts/CurrentUserListPage'
import { createNumberRange } from '../../lib/utils/createNumberRange'

import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

import { PageNumber } from './PageNumber'

interface PaginationProps {
  totalCountOfRegisters: number
  registersPerPage?: number
}

export const Pagination = ({
  totalCountOfRegisters,
  registersPerPage = 10,
}: PaginationProps) => {
  const setCurrentPage = useCurrentUserListPage(
    useCallback((state) => state.setCurrentPage, []),
    shallow,
  )
  const currentPage = useCurrentUserListPage((state) => state.currentPage)
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage)
  const siblingsPagesCount = 1
  const previousPages =
    currentPage > 1
      ? createNumberRange({
          start: currentPage - siblingsPagesCount,
          end: currentPage - 1,
          allowNegatives: false,
        })
      : []

  const nextPages =
    currentPage < lastPage
      ? createNumberRange({
          start: currentPage + 1,
          end: Math.min(currentPage + siblingsPagesCount, lastPage),
        })
      : []

  const hasPreviousPages = previousPages.length > 0
  const hasNextPages = nextPages.length > 0
  const showFirstPage = currentPage > 1 + siblingsPagesCount
  const showLastPage = currentPage + siblingsPagesCount < lastPage
  const showFirstDots = showFirstPage && currentPage > 2 + siblingsPagesCount
  const showLastDots =
    showLastPage && currentPage + 1 + siblingsPagesCount < lastPage

  return (
    <Flex
      flexDirection={{ base: 'column', lg: 'row' }}
      mt='10'
      align='center'
      w='full'
    >
      <Box fontSize='sm' position={{ base: 'unset', lg: 'fixed' }}>
        <Text display='inline'>0</Text> - <Text display='inline'>10</Text> of{' '}
        <Text display='inline'>100</Text>
      </Box>
      <HStack
        spacing='1'
        flex='1'
        justifyContent='center'
        userSelect='none'
        mt={{ base: '2', lg: '0' }}
      >
        <Button
          variant='link'
          disabled={!(currentPage > 1)}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <ArrowLeftIcon color='primaryTextGray' fontSize='xs' />
        </Button>

        {showFirstPage && (
          <>
            <PageNumber pageNumber={1} href='#page' />{' '}
            {showFirstDots && (
              <Text color='primaryTextGray' fontSize='xs'>
                ...
              </Text>
            )}
          </>
        )}

        {hasPreviousPages &&
          previousPages.map((page) => (
            <PageNumber key={page} pageNumber={page} href='#page' />
          ))}

        <PageNumber pageNumber={currentPage} href='#page' isCurrentPage />

        {hasNextPages &&
          nextPages.map((page) => (
            <PageNumber key={page} pageNumber={page} href='#page' />
          ))}
        {showLastPage && (
          <>
            {showLastDots && (
              <Text color='primaryTextGray' fontSize='xs'>
                ...
              </Text>
            )}
            <PageNumber pageNumber={lastPage} href='#page' />
          </>
        )}

        <Button
          variant='link'
          disabled={!(currentPage < lastPage)}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <ArrowRightIcon color='primaryTextGray' fontSize='xs' />
        </Button>
      </HStack>
    </Flex>
  )
}
