import NextLink from 'next/link'
import { Button, Link as ChakraLink } from '@chakra-ui/react'

interface PageNumberProps {
  isCurrentPage: boolean
  pageNumber: number
  href: string
}
export const PageNumber = ({
  isCurrentPage,
  pageNumber,
  href,
}: PageNumberProps) => {
  if (isCurrentPage) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="gray"
        disabled
        _disabled={{ cursor: 'default' }}
      >
        {pageNumber}
      </Button>
    )
  }
  return (
    <NextLink href={href} passHref>
      <ChakraLink display="flex" alignItems="center" color="primaryTextGray">
        {pageNumber}
      </ChakraLink>
    </NextLink>
  )
}
