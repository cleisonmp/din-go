import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useSidebarDrawer } from '../contexts/SidebarDrawer'
import { SidebarNav } from './SidebarNav'

export const Sidebar = () => {
  const { isOpen, closeSidebar } = useSidebarDrawer((state) => state)

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  })

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement='left' onClose={closeSidebar}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }

  return (
    <Flex as='nav' maxW='60' px='4'>
      <SidebarNav />
    </Flex>
  )
}
