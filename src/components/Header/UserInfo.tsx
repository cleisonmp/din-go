import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import { memo } from 'react'
import { useLoggedUserInfo } from '../../lib/hooks/useLoggedUserInfo'

interface UserInfoProps {
  showUserData?: boolean
}
export const UserInfo = memo(function UserInfo({
  showUserData = true,
}: UserInfoProps) {
  const { name, email, avatarUrl } = useLoggedUserInfo()

  return (
    <Flex gap='4' align='center'>
      {showUserData && (
        <Box textAlign='right'>
          <Text>{name}</Text>
          <Text color='primaryTextGray' fontSize={'sm'}>
            {email}
          </Text>
        </Box>
      )}

      <Avatar
        size='md'
        name=''
        bg='transparent'
        // src={`https://avatars.dicebear.com/api/adventurer/${new Date().toISOString()}.svg`}
        src={avatarUrl}
      />
    </Flex>
  )
})
