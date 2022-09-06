import { Box, Flex, HStack, Text } from '@chakra-ui/react'

import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { PageNumber } from './PageNumber'

export const Pagination = () => {
  const pageList = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const currentPage = 5

  return (
    <Flex
      flexDirection={{ base: 'column', lg: 'row' }}
      mt="10"
      align="center"
      w="full"
    >
      <Box fontSize="sm" position={{ base: 'unset', lg: 'fixed' }}>
        <Text display="inline">0</Text> - <Text display="inline">10</Text> of{' '}
        <Text display="inline">100</Text>
      </Box>
      <HStack
        spacing="2"
        flex="1"
        justifyContent="center"
        userSelect="none"
        mt={{ base: '2', lg: '0' }}
      >
        <ArrowLeftIcon color="primaryTextGray" fontSize="xs" />

        {pageList.map((page) => (
          <PageNumber
            key={page}
            pageNumber={page}
            href="#page"
            isCurrentPage={currentPage === page}
          />
        ))}

        <ArrowRightIcon color="primaryTextGray" fontSize="xs" />
      </HStack>
    </Flex>
  )
}
