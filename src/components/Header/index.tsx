import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSidebarDrawer } from '../contexts/SidebarDrawer'
import shallow from 'zustand/shallow'

import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { RiMenuLine } from 'react-icons/ri'
import { InputSearch } from '../Form/InputSearch'
import { IconBar } from './IconBar'
import { UserInfo } from './UserInfo'

export const Header = () => {
  const router = useRouter()
  const { toggleSidebar, closeSidebar } = useSidebarDrawer(
    useCallback((state) => state, []),
    shallow,
  )
  const showDrawerIconMenu = useBreakpointValue({
    base: true,
    lg: false,
  })
  const showSearchBar = useBreakpointValue({
    base: false,
    md: true,
  })

  useEffect(() => {
    closeSidebar()
  }, [closeSidebar, router.asPath])

  const handleSidebarToggle = () => {
    toggleSidebar()
  }

  return (
    <Flex
      as='header'
      w='100%'
      h='20'
      mx='auto'
      alignItems={'center'}
      gap={{ base: '3', lg: '6' }}
      justifyContent={'space-between'}
    >
      {showDrawerIconMenu && (
        <IconButton
          aria-label='open navigation'
          icon={<Icon as={RiMenuLine} />}
          fontSize='24'
          variant='unstyled'
          onClick={handleSidebarToggle}
          mr='2'
          lineHeight='none'
        ></IconButton>
      )}
      {showSearchBar && <InputSearch flex='1' maxWidth={'25rem'} />}

      <Flex gap={{ base: '3', lg: '8' }} align='center'>
        <IconBar />
        <UserInfo showUserData={!showDrawerIconMenu} />
      </Flex>
    </Flex>
  )
}
