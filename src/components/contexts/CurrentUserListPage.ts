import create from 'zustand'

interface CurrentUserListPageProps {
  currentPage: number
  setCurrentPage: (page: number) => void
}

export const useCurrentUserListPage = create<CurrentUserListPageProps>()(
  (set) => ({
    currentPage: 1,
    setCurrentPage: (page: number) => set(() => ({ currentPage: page })),
  }),
)
