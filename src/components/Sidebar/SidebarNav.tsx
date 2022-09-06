import { Flex } from '@chakra-ui/react'
import {
  RiDashboardLine,
  RiContactsLine,
  RiCalendarTodoLine,
  RiChat4Line,
  RiTodoLine,
  RiInformationLine,
  RiPhoneLine,
  RiPriceTag3Line,
  RiInputMethodLine,
} from 'react-icons/ri'

import { SidebarUser } from './SidebarUser'
import { Logo } from '../Logo'
import { NavSection } from './NavSection'

export const SidebarNav = () => {
  return (
    <Flex flexDirection='column' gap='12'>
      <Logo
        fontSize={{ base: '2xl', lg: '3xl' }}
        fontWeight='bold'
        letterSpacing='tight'
        display='flex'
        alignSelf='center'
      />
      <SidebarUser />
      <NavSection
        menuTitle='ADMIN'
        items={[
          {
            title: 'Dashboard',
            href: '/dashboard',
            icon: RiDashboardLine,
          },
          { title: 'Users', href: '/users', icon: RiContactsLine },
        ]}
      />
      <NavSection
        menuTitle='APPS'
        items={[
          { title: 'Calendar', href: '#', icon: RiCalendarTodoLine },
          { title: 'Chats', href: '#', icon: RiChat4Line },
          { title: 'Tasks', href: '#', icon: RiTodoLine },
        ]}
      />

      <NavSection
        menuTitle='PAGES'
        items={[
          { title: 'About', href: '#', icon: RiInformationLine },
          { title: 'Contact', href: '#', icon: RiPhoneLine },
          { title: 'Forms', href: '#', icon: RiInputMethodLine },
          { title: 'Pricing', href: '#', icon: RiPriceTag3Line },
        ]}
      />
    </Flex>
  )
}
