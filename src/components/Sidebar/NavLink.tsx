import NextLink from 'next/link'
import { Icon, Link as ChakraLink, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { useRouter } from 'next/router'

export interface NavLinkProps {
  title: string
  href: string
  icon: IconType
  // iconSize: string | number
}
export const NavLink = ({ title, href, icon }: NavLinkProps) => {
  const router = useRouter()
  const isActive = router.asPath.startsWith(href)

  return (
    <NextLink href={href} passHref>
      <ChakraLink
        display='flex'
        alignItems='center'
        color={isActive ? 'primaryPurple' : ''}
      >
        <Icon as={icon} fontSize={20} />
        <Text ml='4' fontWeight='medium'>
          {title}
        </Text>
      </ChakraLink>
    </NextLink>
  )
}
