import { useEffect, useState } from 'react'
import { useLoggedInUserData } from '../../components/contexts/LoggedInUserData'

export const useUserInfo = () => {
  const { name, email, role, avatarUrl } = useLoggedInUserData()
  const [userTemporaryData, setUserTemporaryData] = useState({
    name: '',
    email: '',
    role: '',
    avatarUrl: '',
  })

  useEffect(() => {
    setUserTemporaryData({ name, email, role, avatarUrl })
  }, [name, email, role, avatarUrl])

  return userTemporaryData
}
