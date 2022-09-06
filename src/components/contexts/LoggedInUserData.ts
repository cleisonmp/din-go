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
  setUser: ({ name, role, avatarUrl }: UserData) => void
}

export const useLoggedInUserData = create<LoggedInUserDataProps & UserData>()(
  persist(
    (set) => ({
      name: '',
      email: '',
      role: '',
      avatarUrl: '',
      setUser: (toNew) =>
        set(() => ({
          name: toNew.name,
          email: toNew.email,
          role: toNew.role,
          avatarUrl: toNew.avatarUrl,
        })),
    }),
    {
      name: `storage-${packageJson.name}-${packageJson.version}`,
    },
  ),
)
