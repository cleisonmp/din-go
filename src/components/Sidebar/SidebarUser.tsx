import { Avatar, Box, Flex, Icon, Text } from '@chakra-ui/react'
import { RiSettings5Line, RiShutDownLine } from 'react-icons/ri'
import { useLoggedUserInfo } from '../../lib/hooks/useLoggedUserInfo'
import { signOut } from '../../lib/services/authentication'

/*interface SidebarUserProps {
  userName: string
  UserRole: string
  userAvatar: string
}*/
export const SidebarUser = () => {
  const { name, role, avatarUrl } = useLoggedUserInfo()

  const handleLogout = () => {
    signOut()
  }

  return (
    <Flex
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      alignSelf='center'
      gap='4'
    >
      <Avatar
        size='md'
        name=''
        bg='transparent'
        // src={`https://avatars.dicebear.com/api/adventurer/${new Date().toISOString()}.svg`}
        src={avatarUrl}
      />
      <Box textAlign='center'>
        <Text>{name}</Text>
        <Text color='primaryTextGray' fontSize={'sm'}>
          {role}
        </Text>
      </Box>
      <Flex gap='4'>
        <Icon as={RiSettings5Line} />
        <Icon
          as={RiShutDownLine}
          cursor='pointer'
          aria-label='Logout'
          onClick={handleLogout}
        />
      </Flex>
    </Flex>
  )
}
