import { Flex, FlexProps, Text } from '@chakra-ui/react'

export const Logo = ({ ...rest }: FlexProps) => {
  return (
    <Flex userSelect='none' {...rest}>
      <Text as='span'>din</Text>
      <Text as='span' color='primaryPurple' fontWeight='black'>
        .
      </Text>
      <Text as='span'>go</Text>
    </Flex>
  )
}
