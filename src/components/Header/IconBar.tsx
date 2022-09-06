import { Flex, Text, useColorMode } from '@chakra-ui/react'
import { BellIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'

export function IconBar() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex
      gap="4"
      pr="4"
      borderRight="1px"
      borderColor="primaryPurple"
      height="8"
      align="center"
    >
      <Flex cursor="pointer">
        <BellIcon fontSize="1.25rem" />
        <Text
          fontSize="xs"
          bg="primaryOrange"
          rounded="full"
          h="4"
          w="4"
          ml="-2.5"
          mt="-1.5"
          display="flex"
          alignItems="center"
          justifyContent="center"
          lineHeight="none"
          color="primaryText"
        >
          3
        </Text>
      </Flex>
      {colorMode === 'light' ? (
        <MoonIcon
          fontSize="1.25rem"
          cursor="pointer"
          aria-label="Toggle Mode"
          onClick={toggleColorMode}
        />
      ) : (
        <SunIcon
          fontSize="1.25rem"
          cursor="pointer"
          aria-label="Toggle Mode"
          onClick={toggleColorMode}
        />
      )}
    </Flex>
  )
}
