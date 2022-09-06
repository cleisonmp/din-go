import { Box, Stack, Text } from '@chakra-ui/react'

import { NavLink, NavLinkProps } from './NavLink'

interface NavSectionProps {
  menuTitle: string
  items: NavLinkProps[]
}
export const NavSection = ({ menuTitle, items }: NavSectionProps) => {
  return (
    <Box alignSelf="flex-start">
      <Text fontWeight="bold" fontSize="sm" color="primaryTextGray">
        {menuTitle.toUpperCase()}
      </Text>
      <Stack spacing="4" mt="8">
        {items.map((item) => {
          return (
            <NavLink
              key={item.title + item.href}
              title={item.title}
              href={item.href}
              icon={item.icon}
            />
          )
        })}
      </Stack>
    </Box>
  )
}
