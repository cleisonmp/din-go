import create from 'zustand'
import { persist } from 'zustand/middleware'
import packageJson from '../../../package.json'

interface UserData {
  name: string
  email: string
  role: string
  avatarUrl: string
}
interface LoggedInUserDataProps {
  isAuthenticated: boolean
  setUser: ({ name, role, avatarUrl }: UserData) => void
  clearUser: () => void
}

export const useLoggedInUserData = create<LoggedInUserDataProps & UserData>()(
  persist(
    (set) => ({
      name: '',
      email: '',
      role: '',
      avatarUrl: '',
      isAuthenticated: false,
      setUser: (toNew) =>
        set(() => ({
          name: toNew.name,
          email: toNew.email,
          role: toNew.role,
          avatarUrl: toNew.avatarUrl,
          isAuthenticated: true,
        })),
      clearUser: () =>
        set(() => ({
          name: '',
          email: '',
          role: '',
          avatarUrl: '',
          isAuthenticated: false,
        })),
    }),
    {
      name: `storage-${packageJson.name}-${packageJson.version}`,
    },
  ),
)
