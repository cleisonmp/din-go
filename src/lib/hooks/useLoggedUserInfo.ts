import { useEffect, useState } from 'react'
import { useLoggedInUserData } from '../../components/contexts/LoggedInUserData'

export const useLoggedUserInfo = () => {
  const { name, email, role, avatarUrl, isAuthenticated } =
    useLoggedInUserData()
  const [userTemporaryData, setUserTemporaryData] = useState({
    name: '',
    email: '',
    role: '',
    avatarUrl: '',
    isAuthenticated: false,
  })

  useEffect(() => {
    setUserTemporaryData({ name, email, role, avatarUrl, isAuthenticated })

    /*const { 'nextauth.token': token } = parseCookies()

    if (token) {
      api
        .get('/me')
        .then((response) => {
          const { email, permissions, roles } = response.data

          setUser({ email, permissions, roles })
        })
        .catch(() => {
          signOut()
        })
    }*/
  }, [name, email, role, avatarUrl, isAuthenticated])

  return userTemporaryData
}
