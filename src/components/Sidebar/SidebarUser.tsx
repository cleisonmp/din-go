import { Avatar, Box, Flex, Icon, Text } from '@chakra-ui/react'
import { RiSettings5Line, RiShutDownLine } from 'react-icons/ri'
import { useUserInfo } from '../../lib/hooks/useUserInfo'

/*interface SidebarUserProps {
  userName: string
  UserRole: string
  userAvatar: string
}*/
export const SidebarUser = () => {
  const { name, role, avatarUrl } = useUserInfo()

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
        <Icon as={RiShutDownLine} />
      </Flex>
    </Flex>
  )
}
